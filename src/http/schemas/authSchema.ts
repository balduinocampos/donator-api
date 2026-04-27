import { validations } from "@/lib/zod";

export const AuthLoginSchema = validations.object({
  email: validations.string().email('Email inválido'),
  senha: validations.string().min(5, 'A senha deve conter no mínimo 5 caracteres')
});

export const emailSchema = validations.object({
  email: validations.string().email('Email inválido')
});


export const updateSenhaSchema = validations.object({
  currentSenha: validations.string().min(5, 'A senha deve conter no mínimo 5 caracteres'),
  newSenha: validations.string().min(5, 'A senha deve conter no mínimo 5 caracteres')
});

export const newSenhaSchema = validations.object({
  email: validations.string().email('Email inválido'),
  newSenha: validations.string().min(5, 'A senha deve conter no mínimo 5 caracteres')
});