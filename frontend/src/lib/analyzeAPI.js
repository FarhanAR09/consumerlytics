import delay from "@/utils/delay";
import mockApiResponse from "@/utils/mockResponse";
import { Product } from "@/classes/product";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export async function getProductAnalysis(product){
    const res = await mockApiResponse(
        {
            product: product,
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam tempus magna, vel pulvinar eros dignissim sed. Etiam bibendum libero laoreet tortor fringilla laoreet. Ut libero nibh, iaculis et urna vitae, scelerisque ultrices ligula. Maecenas ut ipsum ac nulla vestibulum vehicula sed in risus. Nullam est mi, ultrices in convallis at, ultricies et orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pharetra nulla nec velit placerat, sit amet venenatis turpis vulputate.",
        },
        200,
        1000
    );

    if (!res.ok){
        throw new Error("Get product analysis failed");
    }

    return await res.json();
}