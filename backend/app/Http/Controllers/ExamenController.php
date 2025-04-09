<?php

namespace App\Http\Controllers;
use App\Models\Examen;

use Illuminate\Http\Request;

class ExamenController extends Controller
{
    public function getExamData($id)
{
    $examens = Examen::where('patient_id', $id)
        ->select('date', 'type', 'valeur', 'unite')
        ->orderBy('date', 'asc')
        ->get();

    if ($examens->isEmpty()) {
        return response()->json(['message' => 'No exam data found for this patient'], 404);
    }

    return response()->json(['examens' => $examens]);
}

}
