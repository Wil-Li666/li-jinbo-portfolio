export default function ProjectCover({ index }: { index: number }) {
  return (
    <div className={`case-cover cover-${index}`} aria-hidden="true">
      <div className="cover-topline">
        <span>
          {
            [
              "QUALITY INTELLIGENCE",
              "KNOWLEDGE RETRIEVAL",
              "CONTRACT WORKFLOW",
            ][index]
          }
        </span>
        <span>↗</span>
      </div>
      {index === 0 ? (
        <div className="quality-visual">
          <div className="quality-center">
            <span>✳</span>
            <strong>质检情报员</strong>
            <small>从发现到闭环</small>
          </div>
          <span className="quality-label ql-one">规范问答</span>
          <span className="quality-label ql-two">缺陷归因</span>
          <span className="quality-label ql-three">派单追踪</span>
          <i className="orbit orbit-one" />
          <i className="orbit orbit-two" />
        </div>
      ) : index === 1 ? (
        <div className="knowledge-visual">
          <div className="knowledge-doc doc-back">
            <span>建筑规范</span>
          </div>
          <div className="knowledge-doc doc-front">
            <span>Agentic RAG</span>
            <strong>
              让规范
              <br />
              成为答案。
            </strong>
            <i />
            <i />
            <i />
          </div>
          <div className="knowledge-search">
            ⌕ <span>检索 · 重排 · 生成</span> ↗
          </div>
        </div>
      ) : (
        <div className="contract-visual">
          <div className="contract-paper">
            <span>CONTRACT REVIEW</span>
            <strong>合同审查</strong>
            <i />
            <i />
            <div>
              <b>✓</b> 条款核对
            </div>
            <div>
              <b>✓</b> 风险识别
            </div>
          </div>
          <span className="contract-stamp">
            快速审查
            <br />
            <b>＋</b>
            <br />
            精准审查
          </span>
        </div>
      )}
      <div className="cover-caption">
        <span>产品流程示意</span>
        <span>
          {["AGENT / RAG", "RAG / EVALUATION", "WORKFLOW / REVIEW"][index]}
        </span>
      </div>
    </div>
  );
}
