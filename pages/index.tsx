import Head from 'next/head'
/*
 ** Import helpers and GetStaticProps type
 */
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { usePlugin } from 'tinacms'
import { GetStaticProps } from 'next'
import { imagesBlock } from '../components/Images'
import { paragraphBlock } from '../components/Paragraph'
import { featureListBlock } from '../components/FeatureList'

import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { heroBlock } from '../components/Hero'
import data from '../data/data.json'

export default function Home({ file, preview }) {
  /*   const formOptions = {
    label: 'Home Page',
    fields: [{ name: 'title', component: 'text' }],
  }

  const formConfig = {
    id: './data/data.json',
    initialValues: data,
    onSubmit() {
      cms.alerts.success('Saved!');
    },
  }; */

  /*
   ** Register a JSON Tina Form
   */
  const [data, form] = useGithubJsonForm(file, {})
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <div className="home">
      <InlineForm form={form}>
        <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
      </InlineForm>
    </div>
  )
}

const HOME_BLOCKS = {
  hero: heroBlock,
  images: imagesBlock,
  paragraph: paragraphBlock,
  features: featureListBlock,
}

/*
 ** Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/data.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'data/home.json',
        data: (await import('../data/data.json')).default,
      },
    },
  }
}
