<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import CreateCourseFormVue from './Partials/CreateCourseForm.vue';
</script>

<template>
    <AppLayout title="Criar Curso">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Criar Curso
            </h2>
        </template>

        <div>
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <CreateCourseFormVue />
            </div>
        </div>
    </AppLayout>

</template>