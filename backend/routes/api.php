<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PatientController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes pour les patients
Route::get('/test', function() {
    return response()->json(['message' => 'Test réussi']);
});
Route::prefix('patients')->group(function () {
    Route::get('/liste_patient', [PatientController::class, 'index']); 
    Route::post('/create_patient', [PatientController::class, 'store']); 
    Route::get('/{id}', [PatientController::class, 'show']); 
    Route::put('/{id}', [PatientController::class, 'update']); 
    Route::delete('/{id}', [PatientController::class, 'destroy']); 
});