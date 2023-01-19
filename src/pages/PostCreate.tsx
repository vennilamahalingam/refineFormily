import React from "react";
import {  FormItem,
    Editable,
    Input,
    Select,
    Radio,
    DatePicker,
    ArrayItems,
    FormButtonGroup,
    Space,
    FormStep,
    Upload,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, createSchemaField } from '@formily/react'
import { Button } from 'antd';
import { ICategory, IPost, IUser } from "interface";
import { useForm, useSelect} from "@pankod/refine-antd";
import { UploadOutlined } from '@ant-design/icons';

const UploadImage = (props: any) => {
  return (
    <Upload
      {...props}
      action="https://api.fake-rest.refine.dev/images"
      headers={{
        authorization: 'authorization-text',
      }}
    >
  <Button icon={<UploadOutlined />}>Upload image</Button>
</Upload>
  )
}
const SchemaField = createSchemaField({
    components: {
        FormItem,
        FormStep,
        Input,
        Editable,
        DatePicker,
        Space,
        Radio,
        Select,
        ArrayItems,
        UploadImage,
    },
  })
  
  
export const PostCreate: React.FC = () => {
    const { onFinish, redirect, formProps } = useForm<IPost>({
        redirect: false,
    });
    const form = createForm(formProps);
    const formStep = FormStep.createFormStep();

    const handleSubmit = async (formValues: {}) => {
        const response = await onFinish(formValues);
        redirect("show", response?.data?.id);
    };
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        pagination: { current: 1, pageSize: 50 },
    });
    const { selectProps: useSelectProps } = useSelect<IUser>({
        resource: "users",
        optionLabel: "firstName",
        optionValue: "id",
        pagination: { current: 1, pageSize: 50 },
    });
    const { selectProps: tagSelectProps } = useSelect<IUser>({
        resource: "tags",
    });
    
    const { selectProps: languageSelectProps } = useSelect<IUser>({
      resource: "languages",
  });
    const schema = {
        type: 'object',
        properties: {
          step: {
            type: 'void',
            'x-component': 'FormStep',
            'x-component-props': {
              formStep: '{{formStep}}',
              style: {
                marginBottom: 30,
                marginTop: 30
              }
            },
            properties: {
              step1: {
                type: 'void',
                'x-component': 'FormStep.StepPane',
                properties: {
                  title: {
                    type: 'string',
                    title: "Title",
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-decorator-props':{
                        colon: false,
                        labelWidth: 100,
                        labelAlign: "left"
                     },
                     'x-component-props': {
                        name: 'title'
                    }
                  },
                  slug: {
                    type: 'string',
                    title: 'Slug',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-decorator-props':{
                        colon: false,
                        labelWidth: 100,
                        labelAlign: "left"
                     },
                     'x-component-props': {
                        labelWidth: 200,
                        name:'slug',
                    }

                  },
                  content: {
                    type: 'string',
                    title: 'Content',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-decorator-props':{
                        colon: false,
                        labelWidth: 100,
                        labelAlign: "left"
                     },
                     'x-component-props': {
                        placeholder:"text",
                        labelWidth: 200,
                        name: 'content',
                    },
                    required: true,
                  },
                  image: {
                    type: 'array',
                    title: 'Image',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'UploadImage',
                    'x-decorator-props':{
                      colon: false,
                      labelWidth: 100,
                      labelAlign: "left"
                   },
                  },
                  hit: {
                    type: 'string',
                    title: 'Hit',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-decorator-props':{
                        colon: false,
                        labelWidth: 100,
                        labelAlign: "left"
                     },
                     'x-component-props': {
                        labelWidth: 200,
                        name: 'hit'
                    },

                  },
                 
                },
              },
              step2: {
                type: 'void',
                'x-component': 'FormStep.StepPane',
                properties: {
                    category: {
                        type: 'object',
                        properties:{
                            id:{
                            type: 'string',
                            title: 'id',
                            required: true,
                            'x-decorator': 'FormItem',
                            'x-component': 'Select',  
                            'x-decorator-props':{
                                colon: false,
                                asterisk: true,
                                label: "Category",        
                                labelWidth: 100,
                                labelAlign: "left"
                            },
                            'x-component-props': {
                            ...categorySelectProps,
                            name: "id",
                        },
                            
                        },
                    }
                    },
                    user: {
                        type: 'object',
                        properties:{
                            id:{
                            type: 'string',
                            title: 'id',
                            required: true,
                            'x-decorator': 'FormItem',
                            'x-component': 'Select',  
                            'x-decorator-props':{
                                colon: false,
                                asterisk: true,
                                label: "User",
                                labelWidth: 100,
                                labelAlign: "left"
                            },
                            'x-component-props': {
                            ...useSelectProps,
                            name: "id",
                        },
                            
                        },
                    }
                    },
                    tags: {
                        type: 'array',
                        'x-component': 'ArrayItems',
                        'x-decorator': 'FormItem',
                        required: true,
                        'x-decorator-props':{
                            colon: false,
                            labelWidth: 100,
                            labelAlign: "left"
                         },
                         'x-component-props': {
                            size: "large",
                        },
                        maxItems: 3,
                        title: 'Tags',
                        items: {
                          type: 'void',
                          properties: {
                            space: {
                              type: 'void',
                              'x-component': 'Space',
                              properties: {
                                tags: {
                                  type: 'string',
                                  'x-decorator': 'FormItem',
                                  'x-component': 'Select',
                                  'x-component-props': {
                                    style: {
                                      width: 500,
                                    },
                                    ...tagSelectProps,
                                    defaultValue: ArrayItems.useRecord,

                                  },
                                },
                                remove: {
                                  type: 'void',
                                  'x-decorator': 'FormItem',
                                  'x-component': 'ArrayItems.Remove',
                                },
                              },
                            },
                          },
                        },
                        properties: {
                          add: {
                            type: 'void',
                            title: 'Add upto three tags',
                            'x-component': 'ArrayItems.Addition',
                            'x-component-props': {
                                style: {
                                color: '#8d8b8b',
                                width: 500
                                },
                            },
                          },
                        },
                      },
                },
              },
              step3: {
                type: 'void',
                'x-component': 'FormStep.StepPane',
                properties: {
                  status: {
                    type: 'string',
                    title: 'Status',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-decorator-props':{
                        colon: false,
                        asterisk: true,
                        labelWidth: 100,
                        labelAlign: "left"
                     },
                     'x-component-props': {
                        labelWidth: 200,
                    }
                  },
                  status_color: {
                    type: 'string',
                    title: 'Status Color',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-decorator-props':{
                        colon: false,
                        asterisk: true,
                        labelWidth: 100,
                        labelAlign: "left"
                     },
                     'x-component-props': {
                        labelWidth: 200,
                    }
                  },
                  language: {
                    type: 'string',
                        title: 'id',
                        required: true,
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',  
                        'x-decorator-props':{
                            colon: false,
                            asterisk: true,
                            label: "Language",        
                            labelWidth: 100,
                            labelAlign: "left"
                        },
                        'x-component-props': {
                        
                        ...languageSelectProps,
                    },
                }
                },
              },
            },
          },
        },
      }
      
    return (
        
        <FormProvider form={form}>
          <SchemaField schema={schema} scope={{ formStep }} />
          <FormConsumer>
            {() => (
              <FormButtonGroup>
                <Button
                  disabled={!formStep.allowBack}
                  onClick={() => {
                    formStep.back()
                  }}
                >
                  Previous
                </Button>
                <Button
                  disabled={!formStep.allowNext}
                  onClick={() => {
                    formStep.next()
                  }}
                >
                  Next step
                </Button>
                <Button
                  disabled={formStep.allowNext}
                  onClick={() => {
                    formStep.submit(handleSubmit)
                  }}
                >
                  submit
                </Button>
              </FormButtonGroup>
            )}
          </FormConsumer>
        </FormProvider>
      )};
