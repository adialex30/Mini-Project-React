<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Product\StoreProductRequest;
use App\Http\Requests\Api\Product\UpdateProductRequest;
use App\Http\Resources\Api\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
        public function index(Request $request): JsonResponse
    {
        $query = Product::with(['category', 'seller'])
            ->where('is_active', true);

        if ($request->has('search') && ! empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $products = $query->latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully',
            'data'    => ProductResource::collection($products),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        if (! $request->user()->isSeller()) {
            return response()->json([
                'success' => false,
                'message' => 'Only sellers can create products',
            ], 403);
        }

        $product = Product::create([
            'user_id'     => $request->user()->id,
            'category_id' => $request->category_id,
            'name'        => $request->name,
            'slug'        => Str::slug($request->name) . '-' . Str::random(6),
            'description' => $request->description,
            'price'       => $request->price,
            'stock'       => $request->stock,
            'is_active'   => $request->is_active ?? true,
        ]);

        $product->load(['category', 'seller']);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data'    => new ProductResource($product),
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product): JsonResponse
    {
        $product->load(['category', 'seller']);

        return response()->json([
            'success' => true,
            'message' => 'Product retrieved successfully',
            'data'    => new ProductResource($product),
        ], 200);
    }

            /*
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\JsonResponse
    */
    public function update(UpdateProductRequest $request, $id): JsonResponse
    {
        $product = Product::find($id);

        if (! $product) {
            return response()->json([
                'success' => false,
                'message' => "Product with ID {$id} not found.",
            ], 404);
        }

        if ($request->user()->id !== $product->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to update this product',
            ], 403);
        }

        $data = $request->validated();

        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']) . '-' . Str::random(6);
        }

        $product->update($data);

        $product->load(['category', 'seller']);

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully',
            'data'    => new ProductResource($product->fresh(['category', 'seller'])),
        ], 200);
    }

        /**
         * Remove the specified resource from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
    public function destroy(Request $request, $id): JsonResponse
    {
        $product = Product::find($id);

        if (! $product) {
            return response()->json([
                'success' => false,
                'message' => "Product with ID {$id} not found.",
            ], 404);
        }

        if ($request->user()->id !== $product->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to delete this product',
            ], 403);
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully',
            'data'    => null,
        ], 200);
    }
}
