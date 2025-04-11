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
        Schema::create('traitements', function (Blueprint $table) {
            $table->id();
        $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
        // $table->foreignId('diagnostic_id')->constrained()->onDelete('cascade');
        $table->unsignedBigInteger('diagnostic_id');
        $table->string('nom_medicament'); 
        $table->date('date_prescription'); 
        $table->string('posologie');
        $table->string('duree');
        $table->enum('status', ['en_cours', 'terminé', 'interrompu']); // Statut du traitement
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('traitements');
    }
};
