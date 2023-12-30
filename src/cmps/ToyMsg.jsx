export function ToyMsg({ toy }) {
  return (
    <ul>
      {toy.msgs.map((msg) => (
        <li key={msg.id}>{msg.txt}</li>
      ))}
    </ul>
  )
}
