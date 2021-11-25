<?php

namespace App\Http\Controllers\DashboardAPI;

use App\Filters\GlossaryTermFilters;
use App\Http\Controllers\Controller;
use App\Models\GlossaryTerm;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class GlossaryTermsController extends Controller
{
    public function index(Request $request, GlossaryTermFilters $filters)
    {
        if ($request->withoutPagination)
            return GlossaryTerm::filter($filters)->get();
        else
            return GlossaryTerm::filter($filters)
                ->paginate($request->input('page_size') ?? 5)
                ->appends(request()->except('page'));
    }

    public function show(Request $request, $id, GlossaryTermFilters $filters)
    {
        $GlossaryTerm = GlossaryTerm::where('id', $id)->filter($filters)->first();
        if (!$GlossaryTerm)
            throw ValidationException::withMessages(['id' => 'there is no GlossaryTerm with this id: ' . $id]);
        return $GlossaryTerm;
    }
    public function destroy(Request $request, $id)
    {
        $GlossaryTerm = GlossaryTerm::where('id', $id)->first();
        if (!$GlossaryTerm)
            throw ValidationException::withMessages(['id' => 'there is no GlossaryTerm with this id: ' . $id]);
        else {
            $GlossaryTerm->delete();
            return response()->json(['success' => 'GlossaryTerm ' . $GlossaryTerm->id . ' is deleted']);
        }
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string'
        ]);

        $GlossaryTerm = GlossaryTerm::create($data);

        return response()->json(['success' => 'GlossaryTerm ' . $GlossaryTerm->id . ' is created']);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'required|string',
        ]);

        $GlossaryTerm = GlossaryTerm::where('id', $request->id)->first();
        if (!$GlossaryTerm)
            throw ValidationException::withMessages(['id' => 'there is no GlossaryTerm with this id: ' . $id]);
        else {
            $GlossaryTerm->update($data);
            return response()->json(['success' => 'GlossaryTerm ' . $GlossaryTerm->id . ' is created']);
        }
    }
}
