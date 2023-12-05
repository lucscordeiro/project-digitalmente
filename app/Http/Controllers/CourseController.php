<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\User;
use Inertia\Inertia;




class CourseController extends Controller
{
    public function create()
    {
        return inertia('Course/Create');
    }

    public function store(Request $request)
    {   

        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string'
        ]);

        $course = auth()->user()->courses()->create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'category' => $request->input('category'),
        ]);

        return redirect()->route('dashboard', $course);
    }

    public function show(){
        $courses = auth()->user()->courses;
    
        return inertia('Course/Show', ['courses' => $courses]);

    }

    public function destroy($id)
    {
        $course = Course::find($id);


        if (!$course) {
            return;
        }

        $course->delete();

        return Inertia::location(route('course.show'));
    }
}
