<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    public function indexdepartments()
    {
       $department = Department::all();

        return response()->json($department, 201);
    }
}
