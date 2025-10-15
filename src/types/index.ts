// Shared TypeScript type definitions

export interface Container {
	id: string;
	name: string;
	status: "running" | "stopped" | "created";
	image: string;
	createdAt: Date;
}

export interface ContainerConfig {
	name: string;
	image: string;
	env?: Record<string, string>;
	ports?: PortMapping[];
	volumes?: VolumeMount[];
}

export interface PortMapping {
	host: number;
	container: number;
	protocol?: "tcp" | "udp";
}

export interface VolumeMount {
	host: string;
	container: string;
	readonly?: boolean;
}
