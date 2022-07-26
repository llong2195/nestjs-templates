import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text
} from '@chakra-ui/react';
import classes from './LoginForm.module.scss';

type LoginFormProps = {
  doLogin(inputs: FormInputs): void;
  className?: string;
};

type FormInputs = {
  email: string;
  password: string;
};

export function LoginForm(props: LoginFormProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  function onSubmit(inputs: FormInputs) {
    props.doLogin(inputs);
  }

  return (
    <div className={`${classes['form-container']} ${props.className ?? ''}`}>
      <Heading size="md" className="text-left mb-3" color="primary">
        Welcome back
      </Heading>

      <Text fontSize="sm" className="text-left mb-5">
        Enter your email and password to sign in
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors?.email?.message} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="text"
            placeholder="Email"
            {...register('email', {
              minLength: 6,
              required: true
            })}
          />
          {errors.email && <div>Email required longer than 6 character</div>}
        </FormControl>

        <FormControl isInvalid={!!errors?.password?.message} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              minLength: 6,
              required: true
            })}
          />
          {errors.password && (
            <div>Password required longer than 6 character</div>
          )}
        </FormControl>

        <Button
          variant="outline"
          colorScheme="teal"
          type="submit"
          className="w-full mt-5"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
