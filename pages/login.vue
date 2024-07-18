<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from '@/components/ui/toast'
import { auth } from '@/schemas'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(auth.input),
})

const { $client } = useNuxtApp()
const router = useRouter()

const { mutate, error, data, status } = $client.auth.signJWT.useMutation()

const onSubmit = handleSubmit(async (values) => {
  const token = await mutate(values)
  console.log(token)
  if (error.value) {
    toast({
      title: 'Error',
      description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-rose-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
    })
  } else {
  }
})
</script>

<template>
  <div>
    <form class="w-2/3 space-y-6 mb-10" @submit="onSubmit">
      <!-- Username -->
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="good name" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- Password -->
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="super secure password" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your private password.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- Submit -->
      <Button type="submit">
        Submit
      </Button>
    </form>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">
            Ref
          </TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <!-- R1 -->
        <TableRow>
          <TableCell class="font-medium">
            status
          </TableCell>
          <TableCell>
            {{ status }}
          </TableCell>
        </TableRow>
        <!-- R2 -->
        <TableRow>
          <TableCell class="font-medium">
            data
          </TableCell>
          <TableCell>
            {{ data }}
          </TableCell>
        </TableRow>
        <!-- R3 -->
        <TableRow>
          <TableCell class="font-medium">
            error
          </TableCell>
          <TableCell>
            {{ error }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>