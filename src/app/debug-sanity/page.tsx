import { createClient } from "next-sanity"

export default async function DebugSanityPage() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2023-05-03",
    useCdn: false,
  })

  let sanityStatus = "Unknown"
  let error = null
  let projectDetails = null

  try {
    // Try to fetch project details
    projectDetails = await client.request({ uri: `/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}` })
    sanityStatus = "Connected"
  } catch (err) {
    console.error("Error connecting to Sanity:", err)
    error = err
    sanityStatus = "Error"
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Sanity Connection Debug</h1>

      <div className="bg-gray-100 p-4 mb-8 rounded">
        <h2 className="font-semibold mb-2">Environment Variables:</h2>
        <p>NEXT_PUBLIC_SANITY_PROJECT_ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "✅ Set" : "❌ Not set"}</p>
        <p>NEXT_PUBLIC_SANITY_DATASET: {process.env.NEXT_PUBLIC_SANITY_DATASET ? "✅ Set" : "❌ Not set"}</p>
        <p>SANITY_API_TOKEN: {process.env.SANITY_API_TOKEN ? "✅ Set" : "❌ Not set"}</p>
      </div>

      <div className={`p-4 rounded mb-4 ${sanityStatus === "Connected" ? "bg-green-100" : "bg-red-100"}`}>
        <h2 className="font-semibold mb-2">Sanity Connection Status: {sanityStatus}</h2>

      </div>

      {projectDetails && (
        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Project Details:</h2>
          <pre className="bg-white p-4 rounded overflow-auto max-h-96">{JSON.stringify(projectDetails, null, 2)}</pre>
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-semibold mb-2">Troubleshooting Steps:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Make sure your environment variables are correctly set</li>
          <li>Check that your Sanity project ID and dataset name are correct</li>
          <li>Verify that your Sanity API token has the necessary permissions</li>
          <li>Try restarting your development server</li>
          <li>Check your browser console for additional error messages</li>
        </ul>
      </div>
    </div>
  )
}

