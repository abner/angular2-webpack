export interface GitlabEnvironmentConfig {
    defaultUrl: string;
    test: {
        defaultUrl: string,
        apiToken: string,
        project: {
            id: number,
            name: string
        }
    };
}
