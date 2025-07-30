import React, { useState } from "react";

const App: React.FC = () => {
  const [jwt, setJwt] = useState("");
  const [decodedHeader, setDecodedHeader] = useState<any | null>(null);
  const [decodedPayload, setDecodedPayload] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleDecode = () => {
    try {
      const [headerB64, payloadB64] = jwt.split(".");
      const decode = (str: string) =>
        JSON.parse(atob(str.replace(/-/g, "+").replace(/_/g, "/")));
      setDecodedHeader(decode(headerB64));
      setDecodedPayload(decode(payloadB64));
      setError("");
    } catch (err) {
      setError("Invalid JWT format.");
      setDecodedHeader(null);
      setDecodedPayload(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        JWT Visualizer
      </h1>

      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded shadow resize-none"
        placeholder="Paste your JWT here..."
        value={jwt}
        onChange={(e) => setJwt(e.target.value)}
      />

      <button
        className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleDecode}
      >
        Decode JWT
      </button>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      {decodedHeader && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Header</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(decodedHeader, null, 2)}
          </pre>
        </div>
      )}

      {decodedPayload && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Payload</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(decodedPayload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
