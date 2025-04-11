document
  .getElementById("logoForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const resultDiv = document.getElementById("result");

    // Show loading state
    resultDiv.innerHTML = `
        <div class="flex flex-col items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p class="text-gray-600">Generating your logo...</p>
        </div>
    `;

    const data = {
      company: form.company.value.trim(),
      industry: form.industry.value.trim(),
      vibe: form.vibe.value.trim(),
      instructions: form.instructions.value.trim(),
    };

    try {
      const response = await fetch("/api/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to generate logo");
      }

      const { imageUrl } = await response.json();
      resultDiv.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6">
                <img src="${imageUrl}" alt="Generated Logo" class="w-full h-auto rounded-lg">
                <div class="mt-4 flex justify-center">
                    <a href="${imageUrl}" download="logo.png"
                       class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        Download Logo
                    </a>
                </div>
            </div>
        `;
    } catch (err) {
      resultDiv.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex items-center">
                    <svg class="h-5 w-5 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-red-800">${err.message}</p>
                </div>
            </div>
        `;
    }
  });
