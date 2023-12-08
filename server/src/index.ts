import { WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 8080 })
let count = 0

wss.on("connection", function connection(ws) {
	ws.on("error", console.error)

	ws.on("message", function message(data) {
		const message = JSON.parse(data.toString())
		if (message.type === "increment") {
			count++
			for (const client of wss.clients) {
				client.send(JSON.stringify({ type: "countUpdated", count }))
			}
		}
	})

	ws.send(JSON.stringify({ type: "countUpdated", count }))
})
