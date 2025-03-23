import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputField } from '../input-field'

export function NicknameInput() {
  const { control, setFocus } = useFormContext()

  return (
    <>
      <Controller
        name="nickname"
        control={control}
        rules={{
          validate: (data: string) => {
            if (data.length === 0) {
              return '닉네임을 입력해주세요.'
            }

            if (data.length < 2) {
              return '닉네임은 최소 2자 이상이어야 합니다.'
            }
          },
        }}
        render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
          <InputField
            ref={ref}
            autoFocus
            variant="fill"
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => setFocus('introduce')}
            value={value}
            onChangeText={onChange}
            error={error?.message}
          />
        )}
      />
    </>
  )
}
