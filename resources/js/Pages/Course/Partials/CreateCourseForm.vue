<script setup>
import { ref, onMounted, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

const form = useForm({
    title: '',
    description: '',
    category: '',
})
const currentStep = ref(1);
const totalSteps = 2;

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value += 1;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

const createCourse = () => {
    form.post(route('course.store'), {
        errorBag: 'createCourse',
        preserveScroll: true,
    });
};
</script>
<template>
    <FormSection @submitted="createCourse">
        <template #title>
            {{ `Passo ${currentStep} de ${totalSteps}` }}
        </template>
        <template #description>
            Crie um novo curso para compartilhar conhecimento e colaborar.
        </template>
        <template #form>
            <div v-if="currentStep === 1" class="col-span-6">
                <div >
                    <InputLabel value="Criador do Curso" />
                    <div class="flex items-center mt-2">
                        <img class="object-cover w-12 h-12 rounded-full" :src="$page.props.auth.user.profile_photo_url" :alt="$page.props.auth.user.name">
                        <div class="ms-4 leading-tight">
                            <div class="text-gray-900">{{ $page.props.auth.user.name }}</div>
                            <div class="text-sm text-gray-700">
                                {{ $page.props.auth.user.email }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-6 sm:col-span-4 mt-2">
                    <InputLabel for="title" value="Título do Curso" />
                    <TextInput
                        id="title"
                        v-model="form.title"
                        type="text"
                        class="block w-full mt-1"
                        autofocus
                    />
                    <InputError :message="form.errors.title" class="mt-2" />
                </div>

                <div class="col-span-6 sm:col-span-4">
                    <InputLabel for="description" value="Descrição" />
                    <TextInput
                        id="description"
                        v-model="form.description"
                        type="text"
                        class="block w-full mt-1"
                        autofocus
                    />
                    <InputError :message="form.errors.description" class="mt-2" />
                </div>

                <PrimaryButton @click="nextStep" class="mt-2">Próximo</PrimaryButton>
            </div>

            <div class="col-span-6">
                <div v-if="currentStep === 2" class="flex flex-col">
                    <div class="col-span-6 sm:col-span-4">
                        <InputLabel for="category" value="Categoria" />
                        <TextInput
                            id="category"
                            v-model="form.category"
                            type="text"
                            class="block w-full mt-1"
                            autofocus
                        />
                        <!-- <CategorySelect
                            v-model="form.category"
                            :options="selectOptions"
                            autofocus
                        /> -->
                        <InputError :message="form.errors.category" class="mt-2" />
                    </div>
                
                    <div class="flex justify-between mt-2">
                        <div>
                            <PrimaryButton @click="prevStep">Anterior</PrimaryButton>
                        </div>
                        <div>
                            <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                Criar
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div v-if="currentStep === 3">
                <div class="col-span-6 sm:col-span-4">
                    <InputLabel for="modules" value="Step3" />
                    <NumberInput
                        id="modules"
                        v-model="form.modules"
                        type="text"
                        class="block w-full mt-1"
                        autofocus
                    />
                    <InputError :message="form.errors.modules" class="mt-2" /> 
                </div>
                <PrimaryButton @click="prevStep" class="mt-2">Anterior</PrimaryButton>
                <PrimaryButton @click="nextStep" class="mt-2">Próximo</PrimaryButton>
            </div> -->
        </template>
    </FormSection>
</template>