export async function getProductAnalysis(product){

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/analyze/${product.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (!res.ok){
        throw new Error("Get product analysis failed");
    }

    return await res.json();
}