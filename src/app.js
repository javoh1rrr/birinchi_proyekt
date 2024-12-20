document.getElementById("send").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value;
    if (!prompt.trim()) {
      alert("Iltimos, savolingizni kiriting!");
      return;
    }
  
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Javob yuklanmoqda...";
  
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      responseDiv.innerHTML = `<p>${data.response}</p>`;
    } catch (err) {
      responseDiv.innerHTML = `<p>Xatolik yuz berdi: ${err.message}</p>`;
    }
  });
  