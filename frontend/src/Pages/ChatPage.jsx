import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
import { useTranslation } from "react-i18next";

const STEAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY;

const ChatPage = () => {
  const { t } = useTranslation();
  const { id: targetUserId } = useParams();
  
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });

  console.log("STEAM_API_KEY:", STEAM_API_KEY)

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log(t("InitializingStreamChatClient"));

        const client = StreamChat.getInstance(STEAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        // you and me
        // if i start the chat => channelId: [myId, yourId]
        // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error(t("ErrorInitializingChat"), error);
        toast.error(t("CouldNotConnectToChatPleaseTryAgain"));
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId, t]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here:${callUrl}`,
      });
      toast.success(t("VideoCallLinkSentSuccessfully"));
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[110vh] ">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            
            <CallButton handleVideoCall={handleVideoCall} />

            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
export default ChatPage;


