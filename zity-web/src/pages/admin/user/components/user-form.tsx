import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { z } from 'zod'
import { UserSchema } from '@/schema/user.validate'
import { UserRole } from '@/enums'

const UserForm = () => {
  const form = useForm<z.infer<typeof UserSchema>>({
    mode: 'onSubmit',
    defaultValues: {
      full_name: '',
      nation_id: '',
      gender: undefined,
      date_of_birth: undefined,
      username: '',
      password: '',
      email: '',
      phone: '',
      user_type: [],
    },
  })

  const onSubmit = async (data: z.infer<typeof UserSchema>) => {
    console.log(data)
    // Handle form submission logic here
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-fit" variant={'default'} size={'lg'}>
          New User
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-sm lg:max-w-lg xl:max-w-xl"
        aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-2xl">New User</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your full name"
                      {...field}
                      className="focus-visible:ring-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
              <FormField
                control={form.control}
                name="nation_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your national ID"
                        {...field}
                        type="number"
                        minLength={12}
                        maxLength={12}
                        className="focus-visible:ring-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date Of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full md:w-[180px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}>
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your email"
                        {...field}
                        type="email"
                        className="focus-visible:ring-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        type="tel"
                        className="focus-visible:ring-primary read-only:bg-muted"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your username"
                        {...field}
                        type="text"
                        className="focus-visible:ring-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="The password is auto-generated"
                        readOnly
                        {...field}
                        type="password"
                        className="focus-visible:ring-primary read-only:bg-muted"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="user_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>User Type</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      {['ADMIN', 'RESIDENT'].map((role) => (
                        <label
                          key={role}
                          className="flex items-center font-medium">
                          <input
                            type="checkbox"
                            checked={field.value.includes(role as UserRole)}
                            onChange={() => {
                              const newValue = field.value.includes(
                                role as UserRole,
                              )
                                ? field.value.filter((r) => r !== role)
                                : [...field.value, role]
                              field.onChange(newValue) // Update the field value
                            }}
                            className="mr-2"
                          />
                          {role}
                        </label>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end gap-4">
              <DialogClose asChild>
                <Button type='button' size={'lg'} variant={'ghost'}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" size={'lg'} variant={'default'}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UserForm
