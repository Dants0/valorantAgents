import { AgentList, AgentAssetsList } from "@/interface/valorant"
import styles from './styles.module.scss'
import axios from "axios";
import { useEffect, useState } from "react"


export default function Home() {

  const [valorantAgent, setValorantAgent] = useState<AgentList>([])
  const [valorantAgentAssets, setValorantAgentAssets] = useState<AgentAssetsList>([])

  useEffect(() => {
    async function getValorantAgents(): Promise<void> {
      const response = await axios.get<AgentList>(
        "https://valorant-api.com/v1/agents?language=pt-BR"
      )
      setValorantAgentAssets(response.data.data)
      setValorantAgent(response.data.data)
    }
    getValorantAgents()
  }, [])

  const getAbilitiesByAgentName = (agentName: string) => {
    try{
      const abilityAgent = valorantAgentAssets.find(agent => agent.displayName === agentName)
      return abilityAgent?.abilities.map((abilities)=>abilities.displayName)
    }catch(err){
      console.log(err)
      return []
    }
  }

  const returnAbilitiesByAgentName = (agentName: string) => {
    const abilitiesArray = getAbilitiesByAgentName(agentName)
    return abilitiesArray?.map((agent, index) =>{
      return <div key={index}>{agent}</div>
    })
  }

  return (
    <>
      <div className={styles.containerAgents}>
        {
          valorantAgent.filter(agent => agent.isPlayableCharacter===true).map((agent, index) => {
            return (
              <div key={index} className={styles.cardsAgentsDisplay}>
                <ul>
                  <li>{agent.displayName.concat(" - ", agent.developerName)}</li>
                  <li>{agent.description}</li>
                  <li>{returnAbilitiesByAgentName(agent.displayName)}</li>
                </ul>
                  <img src={agent.bustPortrait} alt="agentBackground" />
              </div>
            )
          })
        }
      </div>
    </>
  )
}
