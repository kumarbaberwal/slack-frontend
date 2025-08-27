import { useEffect, useState } from 'react'
import { useSearchParams } from "react-router"
import PageLoader from "../components/PageLoader"
import { useStreamChat } from "../hooks/useStreamChat"

import "./../styles/stream-chat-theme.css"
import { UserButton } from "@clerk/clerk-react"
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react"
import { PlusIcon } from "lucide-react"
import CreateChannelModal from "../components/CreateChannelModal"

const HomePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeChannel, setActiveChannel] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const { chatClient, isLoading, error } = useStreamChat()


  // set the active channel from the url params
  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel")
      if (channelId) {
        const channel = chatClient.channel("messaging", channelId)
        setActiveChannel(channel)
      }
    }
  }, [chatClient, searchParams])


  if (error) {
    return (
      <p>
        Error loading chat: {error.message}
      </p>
    )
  }

  if (isLoading || !chatClient) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className="chat-wrapper">
      <Chat client={chatClient} channel={activeChannel} >
        <div className="chat-container">

          {/* left sidebar */}
          <div className="str-str__channel-list">
            <div className="team-channel-list">
              {/* header */}
              <div className="team-channel-list__header gap-4">
                <div className="brand-container">
                  <img src="/logo.png" alt="Logo" className="brand-logo" />
                  <span className="brand-name">Slap</span>
                </div>
                <div className="user-button-wrapper">
                  <UserButton />
                </div>
              </div>

              {/* channels list */}
              <div className="team-channel-list__content">
                <div className="create-channel-section">
                  <button onClick={() => setIsCreateModalOpen(true)} className="create-channel-btn">
                    <PlusIcon className="size-4" />
                    <span>Create Channel</span>
                  </button>
                </div>

                {/* Channel list */}

              </div>
            </div>
          </div>

          {/* right container */}
          <div className="chat-main">
            <Channel channel={activeChannel} >
              <Window>
                {/* <CustomChannelHeader /> */}
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>

        {isCreateModalOpen && (
          <CreateChannelModal
            onClose={() => setIsCreateModalOpen(false)}
          />
        )}
      </Chat>
    </div >
  )
}

export default HomePage