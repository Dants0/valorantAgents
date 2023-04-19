import { AgentList, AgentAssetsList } from "@/interface/valorant"
import styles from './styles.module.scss'
import axios from "axios";
import { useEffect, useState } from "react"


export default function Home() {

  const [valorantAgent, setValorantAgent] = useState<AgentList>([])
  const [valorantAgentAssets, setValorantAgentAssets] = useState<AgentAssetsList>([])
  const [orderListAsc, setOrderListAsc] = useState("asc")

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
    try {
      const abilityAgent = valorantAgentAssets.find(agent => agent.displayName === agentName)
      console.log(abilityAgent)
      return abilityAgent?.abilities.map((abilities) =>
        abilities.displayName.concat(" : ",
        abilities.description))
    } catch (err) {
      console.log(err)
      return []
    }
  }

  const returnAbilitiesByAgentName = (agentName: string) => {
    const abilitiesArray = getAbilitiesByAgentName(agentName)
    console.log(abilitiesArray)
    return abilitiesArray?.map((ability,index) => {
      return <div key={index}>{ability}</div>
    })
  }

  const getRoleByAgentName = (agentName: string) => {
    try {
      const roleAgent = valorantAgentAssets.find(agent => agent.displayName === agentName)
      return <div>{roleAgent?.role.displayName}</div>
    } catch (err) {
      console.log(err)
    }
  }

  const orderListByAgentName = () => {
    const sortedAgents = valorantAgent.sort((a,b) => {
      if(orderListAsc === "asc"){
        return a.displayName.localeCompare(b.displayName)
      }else{
        return b.displayName.localeCompare(a.displayName)
      }
    })
    return sortedAgents
  }

  const handleToggleOrderListAgents = (e: any) => {
    e.preventDefault()
    if(orderListAsc === "asc"){
      return setOrderListAsc("desc")
    }else{
      return setOrderListAsc("asc")
    }
  }

  orderListByAgentName()
  return (
    <>
        <button onClick={handleToggleOrderListAgents}>alterar ordem</button>
      <div className={styles.containerAgents}>
        {
          valorantAgent.filter(agent => agent.isPlayableCharacter === true).map((agent, index) => {
            return (
              <div key={index} className={styles.cardsAgentsDisplay}><ul>
                <li>{agent.displayName.concat(" - ", agent.developerName)}</li>
                <li>{agent.description}</li>
                <li>Habilidades : {returnAbilitiesByAgentName(agent.displayName)}</li>
                <p>Posição : {getRoleByAgentName(agent.displayName)}</p>
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
