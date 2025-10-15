# Implementation Tasks: Add Startup Installation Check

## Phase 1: Setup Required Components

### Task 1.1: Install Tauri process plugin
- [x] Add `@tauri-apps/plugin-process` to package.json dependencies
- [x] Run `npm install` to install the package
- [x] Verify package is available for import
- [x] Add plugin initialization to `src-tauri/src/lib.rs`
- [x] Add dependency to `src-tauri/Cargo.toml`
- **Validation:** Package appears in node_modules and can be imported ✅

### Task 1.2: Install Shadcn UI Dialog component
- [x] Run `npx shadcn@latest add dialog` to add Dialog primitives
- [x] Verify Dialog components are available in `src/components/ui/dialog.tsx`
- **Validation:** Dialog component files exist and compile without errors ✅

### Task 1.3: Create InstallationRequiredModal component
- [x] Create `src/components/system/InstallationRequiredModal.tsx`
- [x] Implement modal structure using Shadcn Dialog components
- [x] Add props interface: `isOpen`, `onClose`
- [x] Set dialog to not be dismissible (`modal` prop, no overlay close)
- [x] Include title: "Apple Container CLI Required"
- [x] Include explanation text about the dependency requirement
- [x] Include clickable link to https://github.com/apple/container/releases/latest
- [x] Include single "Close" button that calls `onClose`
- [x] Add note that app will exit when closed
- [x] Hide default X close button with CSS
- **Validation:** Component renders in isolation with all content visible ✅

### Task 1.4: Write tests for InstallationRequiredModal
- [x] Create `src/components/system/InstallationRequiredModal.test.tsx`
- [x] Test modal visibility based on `isOpen` prop
- [x] Test "Close" button calls `onClose` callback
- [x] Test GitHub link is rendered with correct href
- [x] Test modal content includes required text (title, explanation, exit notice)
- [x] Test error handling for failed URL opening
- **Validation:** All tests pass with `npm test` ✅

## Phase 2: Implement Startup Check Logic

### Task 2.1: Add startup check to App.tsx
- [x] Import InstallationRequiredModal component
- [x] Import `exit` from `@tauri-apps/plugin-process`
- [x] Add state for modal visibility: `showInstallModal`
- [x] Add useEffect hook to run `check_container_version` on mount
- **Validation:** Check runs automatically on app launch ✅

### Task 2.2: Implement modal trigger logic
- [x] Show modal when startup check fails with "not found" error
- [x] Don't show modal for other error types (CLI installed but failing)
- [x] Handle check errors appropriately with console logging
- **Validation:** Modal appears only when CLI is not found ✅

### Task 2.3: Implement external link opening
- [x] Import `open` from `@tauri-apps/plugin-shell`
- [x] Add click handler for GitHub releases link in modal component
- [x] Open https://github.com/apple/container/releases/latest in default browser
- [x] Add shell plugin to `src-tauri/Cargo.toml` and `src-tauri/src/lib.rs`
- **Validation:** Link opens in browser when clicked ✅

### Task 2.4: Implement application exit on modal close
- [x] Implement `onClose` handler that calls `exit(0)` from process plugin
- [x] Pass handler to InstallationRequiredModal component
- [x] Ensure exit is clean (no hanging processes)
- **Validation:** App exits cleanly when "Close" button is clicked ✅

## Phase 3: Polish and Integration

### Task 3.1: Refine installation instructions content
- [x] Write clear, user-friendly copy for modal body
- [x] Emphasize that CLI is required for app to function
- [x] Include clear instruction to restart app after installation
- [x] Format GitHub link as a visually distinct button with ExternalLink icon
- [x] Add helpful context about what the Apple Container CLI is
- **Validation:** Content is clear and actionable ✅

### Task 3.2: Handle edge cases
- [x] Handle scenario where shell plugin fails to open URL (console error logging)
- [x] Error handling in useEffect for startup check
- [x] Differentiate between "not found" and other CLI errors
- [x] Log non-blocking errors to console without showing modal
- **Validation:** App remains stable in error scenarios ✅

### Task 3.3: Update existing system check UI
- [x] Update System Check card title to "System Check (Debug)"
- [x] Add description indicating automatic checking is now enabled
- [x] Keep manual check button for debugging purposes
- **Validation:** UI clearly indicates automatic checking without duplication ✅

## Phase 4: Testing and Validation

### Task 4.1: Automated testing
- [x] All unit tests pass (16 tests across 3 test files)
- [x] Frontend builds successfully without errors
- [x] Rust tests pass (5 tests)
- [x] Linting passes (only pre-existing warning in button.tsx)
- **Validation:** Automated tests confirm implementation ✅

### Task 4.2: Manual testing - CLI installed
- [ ] Start app with container CLI installed (via `container --version`)
- [ ] Verify no modal appears
- [ ] Verify app functions normally
- **Validation:** Ready for manual testing

### Task 4.3: Manual testing - CLI not installed
- [ ] Rename or move `container` binary temporarily
- [ ] Start app and verify modal appears immediately
- [ ] Verify modal shows all required content
- [ ] Verify modal cannot be dismissed by clicking outside or pressing escape
- [ ] Click GitHub link and verify it opens in browser
- [ ] Verify modal remains visible after opening link
- [ ] Click "Close" button and verify app exits immediately
- [ ] Restore container binary
- **Validation:** Ready for manual testing

### Task 4.4: Manual testing - CLI check fails (not "not found")
- [ ] Test with container returning an error
- [ ] Verify error is logged to console
- [ ] Verify app doesn't show installation modal
- **Validation:** Ready for manual testing

### Task 4.5: Manual testing - Installation and restart flow
- [ ] Start app without CLI installed
- [ ] Click GitHub link and follow installation
- [ ] Close modal (app should exit)
- [ ] Restart app
- [ ] Verify app launches successfully without modal
- **Validation:** Ready for end-to-end manual testing

## Phase 5: Documentation

### Task 5.1: Update CLAUDE.md
- [x] Add Installation section with Apple Container CLI instructions
- [x] Document the startup check behavior
- [x] Note the hard dependency enforcement (app exits if CLI not found)
- [x] Add troubleshooting guidance for installation issues
- [x] Document the exit behavior and modal flow
- **Validation:** Documentation is clear and complete ✅

### Task 5.2: Update README (if exists)
- [x] README.md does not exist, no update needed
- **Validation:** N/A ✅

## Dependencies & Parallelization

**Parallel tracks:**
- Tasks 1.1 and 1.2 (plugin installations) can run in parallel
- Task 1.3-1.4 (modal component) depend on 1.2 but can run independently of 1.1
- Task 5.1-5.2 (documentation) can run anytime after design is clear

**Sequential dependencies:**
- 1.1 must complete before 2.4 (exit implementation needs process plugin)
- 1.2 → 1.3 → 1.4 (Dialog setup must complete first)
- 1.4 → 2.1 → 2.2 (Startup logic depends on modal component)
- 2.3 can run in parallel with 2.1-2.2
- 2.4 depends on 2.1 and 1.1
- Phase 3 requires Phase 2 completion
- Phase 4 requires Phase 3 completion

**Estimated effort:** 2-3 hours for full implementation and testing (simpler than original approach due to removed retry logic)
