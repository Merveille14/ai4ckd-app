<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name'); // Prénom
            $table->string('last_name'); // Nom
            $table->string('email')->unique(); // Email unique
            $table->string('password'); // Mot de passe
            $table->enum('role', ['doctor', 'nurse', 'admin', 'staff']); // Rôle (ex: docteur, infirmier, admin, personnel)
            $table->string('phone_number')->nullable(); // Numéro de téléphone
            $table->string('specialization')->nullable(); // Spécialisation (ex: cardiologie, pédiatrie, etc.)
            $table->text('address')->nullable(); // Adresse de l'utilisateur
            $table->boolean('is_active')->default(true); // Si l'utilisateur est actif ou non
            $table->rememberToken(); // Pour se souvenir de l'utilisateur (facultatif, pour la gestion de session)
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
