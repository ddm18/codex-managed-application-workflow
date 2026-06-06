const codexMermaidConfig = {
  startOnLoad: false,
  theme: "base",
  flowchart: {
    curve: "basis",
    htmlLabels: true,
    nodeSpacing: 36,
    rankSpacing: 40,
  },
  themeVariables: {
    background: "#090d14",
    mainBkg: "#101721",
    secondBkg: "#151923",
    tertiaryColor: "#201016",
    primaryColor: "#101721",
    primaryBorderColor: "#e21d3f",
    primaryTextColor: "#f5f7fa",
    secondaryColor: "#151923",
    secondaryBorderColor: "#33e6ff",
    secondaryTextColor: "#f5f7fa",
    lineColor: "#e21d3f",
    textColor: "#f5f7fa",
    fontFamily: "Inter, system-ui, sans-serif",
    clusterBkg: "#0e141d",
    clusterBorder: "#354455",
    edgeLabelBackground: "#090d14",
    nodeBorder: "#33e6ff",
    signalColor: "#e21d3f",
    signalTextColor: "#f5f7fa",
    actorBkg: "#101721",
    actorBorder: "#33e6ff",
    actorTextColor: "#f5f7fa",
    actorLineColor: "#e21d3f",
    noteBkgColor: "#201016",
    noteBorderColor: "#e21d3f",
    noteTextColor: "#f5f7fa",
    fontSize: "16px",
  },
};

async function renderCodexMermaid() {
  if (!window.mermaid) {
    return;
  }

  document.querySelectorAll("pre.mermaid").forEach((block) => {
    const code = block.querySelector("code");
    if (!code) {
      return;
    }

    const diagram = document.createElement("div");
    diagram.className = "mermaid";
    diagram.textContent = code.textContent;
    block.replaceWith(diagram);
  });

  window.mermaid.initialize(codexMermaidConfig);
  await window.mermaid.run({ querySelector: ".mermaid" });
}

if (window.document$) {
  window.document$.subscribe(renderCodexMermaid);
} else {
  window.addEventListener("load", renderCodexMermaid);
}
