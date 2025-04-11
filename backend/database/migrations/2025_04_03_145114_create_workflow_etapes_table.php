<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workflow_etapes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workflow_id')->constrained('workflows')->onDelete('cascade');
            $table->string('type'); // Type de l'étape, par exemple "Consultation"
            $table->date('date_prev'); // Date prévue
            $table->string('frequence')->nullable(); // Fréquence (hebdomadaire, mensuelle, etc.)
            $table->enum('statut', ['en attente', 'terminé', 'annulé'])->default('en attente');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workflow_etapes');
    }
};
