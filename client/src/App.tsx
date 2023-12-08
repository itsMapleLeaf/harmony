import { createSignal } from "solid-js"

const [count, setCount] = createSignal(0)

const socket = new WebSocket(import.meta.env.VITE_SOCKET_URL)

socket.addEventListener("open", (event) => {})

socket.addEventListener("message", (event) => {
	const message = JSON.parse(event.data)
	if (message.type === "countUpdated") {
		setCount(message.count)
	}
})

export function App() {
	return (
		<>
			<button
				type="button"
				onClick={() => socket.send(JSON.stringify({ type: "increment" }))}
			>
				count is {count()}
			</button>
		</>
	)
}
