export default function AdminGuidePage() {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Sanity Content Management Guide</h1>
  
        <div className="prose max-w-none">
          <h2>How to Upload Products and Associate with Collections</h2>
  
          <p>
            This guide will walk you through the process of uploading products to your Sanity Studio and associating them
            with collections.
          </p>
  
          <h3>Step 1: Access Sanity Studio</h3>
          <p>
            Navigate to <code>/admin</code> in your browser to access the Sanity Studio interface. You&apos;`ll need to log in
            with your Sanity credentials.
          </p>
  
          <h3>Step 2: Create Collections First</h3>
          <ol>
            <li>In the Sanity Studio sidebar, click on &quot;Collection&quot;</li>
            <li>Click the &quot;Create new document&quot; button</li>
            <li>
              Fill in the required fields:
              <ul>
                <li>
                  <strong>Title:</strong> The name of your collection (e.g., &quot;Summer Collection 2023&quot;)
                </li>
                <li>
                  <strong>Slug:</strong> Click &quot;Generate&quot; to create a URL-friendly version of the title
                </li>
                <li>
                  <strong>Image:</strong> Upload a featured image for the collection
                </li>
                <li>
                  <strong>Description:</strong> Write a brief description of the collection
                </li>
                <li>
                  <strong>Featured:</strong> Toggle on if you want this collection to appear on the homepage
                </li>
                <li>
                  <strong>Order:</strong> Set the display order for featured collections (lower numbers appear first)
                </li>
              </ul>
            </li>
            <li>Click "Publish" to save the collection</li>
          </ol>
  
          <h3>Step 3: Create Products and Associate with Collections</h3>
          <ol>
            <li>In the Sanity Studio sidebar, click on &quot;Product&quot;</li>
            <li>Click the &quot;Create new document&quot; button</li>
            <li>
              Fill in the required fields:
              <ul>
                <li>
                  <strong>Name:</strong> The product name
                </li>
                <li>
                  <strong>Slug:</strong> Click &quot;Generate&quot; to create a URL-friendly version of the name
                </li>
                <li>
                  <strong>Images:</strong> Upload one or more product images
                </li>
                <li>
                  <strong>Price:</strong> The current selling price
                </li>
                <li>
                  <strong>Original Price:</strong> The original price (if discounted)
                </li>
                <li>
                  <strong>Description:</strong> Detailed product description
                </li>
                <li>
                  <strong>Category:</strong> Select the appropriate category
                </li>
                <li>
                  <strong>Collections:</strong> Click "Add item" and search for the collection(s) you want to associate
                  this product with
                </li>
                <li>Fill in other fields as needed (Metal Type, Weight, Purity, etc.)</li>
              </ul>
            </li>
            <li>Click &quot;Publish&quot; to save the product</li>
          </ol>
  
          <h3>Step 4: Verify Your Content</h3>
          <p>After publishing your collections and products:</p>
          <ol>
            <li>
              Visit the collections page (<code>/collections</code>) to see all your collections
            </li>
            <li>Click on a collection to view the products associated with it</li>
            <li>Check the product detail pages to ensure all information is displayed correctly</li>
          </ol>
  
          <h3>Tips for Effective Product Management</h3>
          <ul>
            <li>
              <strong>Use high-quality images:</strong> Upload clear, well-lit product images from multiple angles
            </li>
            <li>
              <strong>Write detailed descriptions:</strong> Include material, dimensions, craftsmanship details, and any
              special features
            </li>
            <li>
              <strong>Keep inventory updated:</strong> Regularly check and update product availability
            </li>
            <li>
              <strong>Use collections strategically:</strong> Create themed collections based on occasions, materials, or
              styles
            </li>
            <li>
              <strong>Add proper specifications:</strong> Fill in all technical details to help customers make informed
              decisions
            </li>
          </ul>
  
          <h3>Troubleshooting Common Issues</h3>
          <ul>
            <li>
              <strong>Products not appearing in collections:</strong> Make sure you've properly referenced the collection
              in the product&apos;s &quot;`Collections&quot; field
            </li>
            <li>
              <strong>Images not displaying:</strong> Check that images have been properly uploaded and processed by
              Sanity
            </li>
            <li>
              <strong>Missing information on the frontend:</strong> Verify that all required fields are filled in Sanity
              Studio
            </li>
            <li>
              <strong>Changes not reflecting immediately:</strong> Some changes may take a few minutes to propagate
              through the CDN
            </li>
          </ul>
        </div>
      </div>
    )
  }
  
  