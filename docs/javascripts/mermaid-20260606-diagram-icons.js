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
    fontSize: "18px",
  },
};

function mermaidAssetUrl(name) {
  const script = document.querySelector('script[src*="mermaid-20260606-diagram-icons"]');
  const base = script ? new URL("../assets/", script.src) : new URL("assets/", document.baseURI);
  return new URL(name, base).href;
}

function addSvgIconBeforeText(textNode, iconUrl, className) {
  if (textNode.dataset.iconDecorated === "true") {
    return;
  }

  textNode.dataset.iconDecorated = "true";

  const svg = textNode.ownerSVGElement;
  const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
  const box = textNode.getBBox();
  const size = 24;
  const gap = 8;

  image.setAttribute("href", iconUrl);
  image.setAttribute("width", String(size));
  image.setAttribute("height", String(size));
  image.setAttribute("x", String(box.x - size - gap));
  image.setAttribute("y", String(box.y + box.height / 2 - size / 2));
  image.setAttribute("preserveAspectRatio", "xMidYMid meet");
  image.classList.add("diagram-svg-icon", className);

  const filterId = className === "diagram-svg-icon--codex" ? "diagram-codex-glow" : "";
  if (filterId && !svg.querySelector(`#${filterId}`)) {
    const defs = svg.querySelector("defs") || svg.insertBefore(document.createElementNS("http://www.w3.org/2000/svg", "defs"), svg.firstChild);
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", filterId);
    filter.setAttribute("x", "-60%");
    filter.setAttribute("y", "-60%");
    filter.setAttribute("width", "220%");
    filter.setAttribute("height", "220%");

    const blur = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
    blur.setAttribute("dx", "0");
    blur.setAttribute("dy", "0");
    blur.setAttribute("stdDeviation", "2.2");
    blur.setAttribute("flood-color", "#33e6ff");
    blur.setAttribute("flood-opacity", "0.45");
    filter.appendChild(blur);
    defs.appendChild(filter);
  }

  if (filterId) {
    image.setAttribute("filter", `url(#${filterId})`);
  }

  textNode.parentNode.insertBefore(image, textNode);
}

function decorateMermaidDiagramIcons() {
  const codexIcon = mermaidAssetUrl("codex-app-icon.png");

  document.querySelectorAll(".mermaid svg text").forEach((textNode) => {
    const text = textNode.textContent || "";
    if (!text.includes("[codex]")) {
      return;
    }

    textNode.textContent = text.replace("[codex]", "").trim();
    addSvgIconBeforeText(textNode, codexIcon, "diagram-svg-icon--codex");
  });
}

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
  decorateMermaidDiagramIcons();
}

if (window.document$) {
  window.document$.subscribe(renderCodexMermaid);
} else {
  window.addEventListener("load", renderCodexMermaid);
}
