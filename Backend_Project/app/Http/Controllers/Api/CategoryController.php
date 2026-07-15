<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Api\Category\StoreCategoryRequest;
use App\Http\Requests\Api\Category\UpdateCategoryRequest;
use App\Http\Resources\Api\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Categories retrieved successfully',
            'data'    => CategoryResource::collection($categories),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = Category::create([
            'name'        => $request->name,
            'slug'        => Str::slug($request->name),
            'description' => $request->description,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data'    => new CategoryResource($category),
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   public function show($id): JsonResponse
    {
        $category = Category::find($id);

        if (! $category) {
            return response()->json([
                'success' => false,
                'message' => "Category with ID {$id} not found.",
                'data'    => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Category retrieved successfully',
            'data'    => new CategoryResource($category),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse {
    if (!$request->user() || $request->user()->role !== 'seller') {
        return response()->json([
            'success' => false,
            'message' => 'You are not authorized to update this category',
        ], 403);
    }

    $data = $request->validated();

    if (isset($data['name'])) {
        $data['slug'] = Str::slug($data['name']) . '-' . Str::random(6);
    }

    $category->update($data);

    return response()->json([
        'success' => true,
        'message' => 'Category updated successfully',
        'data'    => new CategoryResource($category->fresh()),
    ], 200);
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Category $category): JsonResponse
    {
        if (! $request->user() || $request->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to delete this category',
            ], 403);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
            'data'    => null,
        ], 200);
    }
}
