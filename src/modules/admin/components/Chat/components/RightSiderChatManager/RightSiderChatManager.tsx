import CardScrollRight from "./components/CardScrollRight"

export default function RightSiderChatManager({ selectedChat }: { selectedChat: any }) {
    return (
        <>
            <CardScrollRight selectedChat={selectedChat} />
        </>
    )
}
