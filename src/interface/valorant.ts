interface Agent{
    uuid: string,
    displayName: string,
    description: string,
    bustPortrait: string,
    developerName: string,
    isPlayableCharacter: boolean,
    language: "pt-BR",
    data: any
}

export type AgentList = Agent[];

interface AgentAssets{
    uuid: string,
    displayName: string,
    role: string,
    abilities: [
        {
            description: any;
            displayName: string
        }
    ]
}

export type AgentAssetsList = AgentAssets[];