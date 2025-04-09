<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // CREATE - Enregistrement d'un nouvel utilisateur
    public function register(Request $request)
    {
        Log::info('Register Request:', $request->all());

        try {
            //  Remplacer ici la validation directe
            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
                'role' => 'required|in:admin,doctor,nurse,pharmacist,lab_technician,dietician',
                'phone_number' => 'nullable|string|max:20',
                'specialization' => 'nullable|string|max:255',
                'address' => 'nullable|string',
            ]);

            //  Vérifie s'il y a des erreurs
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Échec de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // ✅ Validation réussie → continue
            $validated = $validator->validated();

            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
                'phone_number' => $validated['phone_number'] ?? null,
                'specialization' => $validated['specialization'] ?? null,
                'address' => $validated['address'] ?? null,
            ]);

            return response()->json(['message' => 'Utilisateur créé avec succès', 'user' => $user], 201);

        } catch (\Exception $e) {
            Log::error("Erreur lors de l'enregistrement : " . $e->getMessage());
            return response()->json([
                'message' => 'Erreur serveur',
                'exception' => $e->getMessage()
            ], 500);
        }
    }

    // READ - Récupérer tous les utilisateurs
    public function index()
    {
        $users = User::all();
        return response()->json(['data' => $users]);
    }

    // READ - Récupérer un utilisateur spécifique
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        return response()->json(['data' => $user]);
    }

    // UPDATE - Modifier un utilisateur
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $validated = $request->validate([
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6|confirmed',
            'role' => 'sometimes|required|in:admin,doctor,nurse,pharmacist,lab_technician,dietician',
            'phone_number' => 'nullable|string|max:20',
            'specialization' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return response()->json(['message' => 'Utilisateur mis à jour avec succès', 'user' => $user]);
    }

    // DELETE - Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
