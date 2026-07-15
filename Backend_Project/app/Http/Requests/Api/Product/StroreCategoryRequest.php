<?php

namespace App\Http\Requests\Api\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreCategoryRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name'        => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
        ];
    }
}
