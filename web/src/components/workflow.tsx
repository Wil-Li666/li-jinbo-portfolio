export default function Workflow({
  steps,
  variant = 0,
}: {
  steps: string[];
  variant?: number;
}) {
  return (
    <div className={`workflow workflow-${variant}`}>
      <div className="workflow-caption">
        <span>产品流程</span>
        <span aria-hidden="true">↗</span>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span className="workflow-node">{["⌕", "✳", "◎", "✓"][index]}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
