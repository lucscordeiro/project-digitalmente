<script setup>
import { ref } from 'vue';
import { useForm, usePage } from "@inertiajs/vue3";
import AppLayout from '@/Layouts/AppLayout.vue';
import ConfirmationModal from "@/Components/ConfirmationModal.vue";
import DangerButton from "@/Components/DangerButton.vue";

const { props } = usePage();

const confirmingCourseDeletion = ref(false);
const selectedCourse = ref(null);

const form = ref({
  processing: false,
});

const confirmCourseDeletion = (course) => {
  console.log(course);
  confirmingCourseDeletion.value = true;
  selectedCourse.value = course;
};

const deleteCourse = async () => {
  if (selectedCourse.value) {
    const course = selectedCourse.value;
    const form = useForm({
        id: course.id,
        name: course.name,
        category: course.category,
        description: course.description
    });
    try {
      await form.delete(route('course.destroy', course.id), {
        preserveScroll: true,
      });

      // Operação bem-sucedida, fecha o modal de confirmação
      confirmingCourseDeletion.value = false;
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
    }
  }
};

</script>
<template>
    <AppLayout title="Meus Cursos">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Meus Cursos
            </h2>
        </template>

        <div>
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <table class="w-full table-fixed text-left">
                    <thead class="text-x">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium text-sm text-gray-700">Titulo</th>
                            <th scope="col" class="px-6 py-3 font-medium text-sm text-gray-700">Categoria</th>
                            <th scope="col" class="px-6 py-3 font-medium text-sm text-gray-700">Descrição</th>
                            <th scope="col" class="px-6 py-3 font-medium text-sm text-gray-700">Ações</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="course in props.courses" :key="course.id" class="bg-white border-b hover:bg-gray-200">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap truncate">
                                {{ course.title }}
                            </th>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap truncate">
                                {{ course.category }}
                            </th>
                            <td class="px-6 py-4 truncate">
                                {{ course.description }}
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex">
                                    <a title="Editar Produto"
                                        class="font-medium text-blue-600 hover:underline cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path
                                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </a>
                                    <a @click="confirmCourseDeletion(course)" title="Deletar Produto"
                                        class="mx-2 font-medium text-red-600 hover:underline cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-trash" viewBox="0 0 16 16">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </a>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <ConfirmationModal :show="confirmingCourseDeletion" @close="confirmingCourseDeletion = false">
            <template #title>
                Excluir Curso
            </template>

            <template #content>
                Tem certeza de que deseja excluir este curso? Depois que um curso for excluído, todos os seus recursos e
                dados serão excluídos permanentemente.
            </template>

            <template #footer>
                <SecondaryButton @click="confirmingCourseDeletion = false" class="cursor-pointer">
                    Cancelar
                </SecondaryButton>

                <DangerButton class="ml-3" :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
                    @click="deleteCourse">
                    Excluir
                </DangerButton>
            </template>
        </ConfirmationModal>
    </AppLayout>
</template>
