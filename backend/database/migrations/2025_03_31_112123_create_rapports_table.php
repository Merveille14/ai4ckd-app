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
        Schema::create('rapports', function (Blueprint $table) {
            $table->id();
            $table->date('dateCreation');
            $table->text('contenu');
            $table->string('chemin_pdf')->nullable();
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
<<<<<<<< HEAD:backend/database/migrations/2025_04_02_153856_create_rapports_table.php
            // $table->foreignId('user_id')->constrained('medecins')->onDelete('cascade');
========
            $table->foreignId('medecin_id')->constrained('users', 'id')->onDelete('cascade');
>>>>>>>> 7958a2e79c411366e35bffa9cfde90d37d9f1b25:backend/database/migrations/2025_03_31_112123_create_rapports_table.php
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rapports');
    }
};
