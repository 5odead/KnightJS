const tooltip = document.createElement("div");
tooltip.id = "knight-tooltip";
tooltip.style.cssText = `
  position: fixed;
  background: #111;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 13px;
  font-family: system-ui;
  color: #f0f0f0;
  z-index: 999999;
  pointer-events: auto;
  display: none;
  box-shadow: 0 8px 30px rgba(0,0,0,0.8);
  width: 240px;
  line-height: 1.5;
`;
document.body.appendChild(tooltip);

//tooltip on hover
document.addEventListener("mouseover", function(e) {
  const link = e.target.closest("a");
  if (!link || !link.href) return;
  tooltip.style.left = e.clientX + 15 + "px";
  tooltip.style.top = e.clientY + 15 + "px";
  try {
    chrome.runtime.sendMessage({ action: "isBlacklisted", url: link.href }, function(response) {
      if (chrome.runtime.lastError) return;
      if (!response) return;
      const dangerous = response.result;
      tooltip.innerHTML = dangerous
        ? `<span style="color:#ff4444">🔴 Dangerous</span><br><small style="color:#888">Knight has flagged this domain</small>`
        : `<span style="color:#44ff88">✅ Safe</span><br><small style="color:#888">Not in threat database</small>`;
      tooltip.style.borderColor = dangerous ? "#ff0000" : "#333";
      tooltip.style.display = "block";
    });
  } catch(e) {
    return;
  }
});

//tooltip on mouse Leave
document.addEventListener("mouseout", function(e) {
  const link = e.target.closest("a");
  if (!link) return;
  if (tooltip.contains(e.relatedTarget)) return;
  tooltip.style.display = "none";
});

document.addEventListener("scroll", function() {
  tooltip.style.display = "none";
});
