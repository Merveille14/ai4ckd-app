<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
<<<<<<< HEAD
use App\Http\Controllers\Api\PatientController;
=======
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlerteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RendezVousController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ExamenController;
use App\Http\Controllers\RapportController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'userProfile']);
});

// Route de test pour voir si l'API fonctionne
Route::get('/test', function () {
    return response()->json(['message' => 'API fonctionne correctement']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']); // Données du dashboard
    Route::get('/dashboard/patients', [DashboardController::class, 'countPatients']); // Nombre total de patients
    Route::get('/dashboard/alerts', [DashboardController::class, 'criticalAlerts']); // Alertes critiques
    Route::get('/dashboard/rendez_vous', [DashboardController::class, 'upcomingRendezVous']); // Prochains rendez-vous
    Route::get('/dashboard/evolution', [DashboardController::class, 'evolutionGraph']); // Graphique d’évolution
});

Route::get('/alerts', [AlerteController::class, 'index']);
Route::post('/alerts', [AlerteController::class, 'store']);
Route::put('/alerts/{id}', [AlerteController::class, 'update']);
Route::delete('/alerts/{id}', [AlerteController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/rendez_vous', [RendezVousController::class, 'index']); // Lister les rendez-vous
    Route::post('/rendez_vous', [RendezVousController::class, 'store']); // Créer un rendez-vous
    Route::get('/rendez_vous/{id}', [RendezVousController::class, 'show']); // Voir un rendez-vous spécifique
    Route::put('/rendez_vous/{id}', [RendezVousController::class, 'update']); // Modifier un rendez-vous
    Route::delete('/rendez_vous/{id}', [RendezVousController::class, 'destroy']); // Supprimer un rendez-vous
});
>>>>>>> origin/mv


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
<<<<<<< HEAD

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
=======
// Routes pour les tests
Route::get('/test', function() {
    return response()->json(['message' => 'Test réussi']);
});

// Routes pour les patients
Route::get('/patients', [PatientController::class, 'getPatientList']); // Lister tous les patients
Route::post('/patients', [PatientController::class, 'storePatient']); // Créer un nouveau patient
Route::get('/patients/{id}', [PatientController::class, 'getPatientById']); // Afficher un patient spécifique
Route::put('/patients/{id}', [PatientController::class, 'updatePatient']); // Mettre à jour un patient
Route::delete('/patients/{id}', [PatientController::class, 'deletePatient']); // Supprimer un patient

//routes pour less users
Route::post('/register', [UserController::class, 'register']);
Route::get('/user', [UserController::class, 'index']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::put('/user/{id}', [UserController::class, 'update']);
Route::delete('/user/{id}', [UserController::class, 'destroy']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/patients/{id}/details', [PatientController::class, 'getPatientDetails']);
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/patients/{id}/examens', [ExamenController::class, 'getExamData']);
});




>>>>>>> origin/mv
