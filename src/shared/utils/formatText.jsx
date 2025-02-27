export function formatText(text) {
  text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
}
