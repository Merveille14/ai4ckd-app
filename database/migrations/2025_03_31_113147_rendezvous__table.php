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
        Schema::create('rendezvous', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
            $table->date('date_rendezvous'); // Date du rendez-vous
            $table->time('heure_rendezvous'); // Heure du rendez-vous
            $table->string('lieu')->nullable();
            $table->foreignId('medecin_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['confirmé', 'annulé', 'reporté']);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendezvous');
    }
};
