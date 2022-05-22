import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '../../components/layout'
import axios from 'axios'
import { Checkbox } from '@mui/material'
import { FormGroup } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material'
import styles from '../../styles/Add.module.css'


export default function Somepage() {
  const queryClient = useQueryClient();
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [descr, setDescr] = useState('')
  const [tag, setTag] = useState(['all'])
  const keyword = 'test'

    const addArticle = (article) => {
        return axios.post('https://infrequent-maroon-prepared.glitch.me/news', article)
    }

  const handleAddArticleClick = () => {
    if(name.length <= 40){
        if(descr.length <= 100) {
         if (password === keyword) {
         const article = { name, body, descr, tag }
         addArticle(article)
         alert('You successfully added an article')
       }
         else{
           alert('Password is incorrect')
         }
       }
       else{
         alert('Description should be less then 100 characters')
       }
    }
    else{alert('Heading shold be less then 40 characters')}
  }

  function handleNewsChange()  {
    if(tag.includes('news')){setTag(e => [...e.filter(y => y !== 'news')] )} 
    else{setTag(e => [...e, 'news'] )}
  }

  function handleEventsChange()  {
    if(tag.includes('events')){setTag(e => [...e.filter(y => y !== 'events')] )} 
    else{setTag(e => [...e, 'events'] )}
  }

  function handleChangelogChange()  {
    if(tag.includes('changelog')){setTag(e => [...e.filter(y => y !== 'changelog')] )} 
    else{setTag(e => [...e, 'changelog'] )}
  }

  function vw(v) {
    if (typeof window !== 'undefined'){
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;}
  }
return (
  <Layout>
  <div className={styles.center}>
    <div><TextareaAutosize
    aria-label="heading"
    minRows={2}
    placeholder="Заголовок, не больше 40 символов"
    style={{ width: 200 }}
    onChange={e => setName(e.target.value)}/>
    </div>
    <div><TextareaAutosize
    aria-label="Description"
    minRows={3}
    placeholder="Описание статьи, не больше 100 символов"
    style={{ width: 300 }}
    onChange={e => setDescr(e.target.value)}/>
    </div>
    <div><TextareaAutosize
    className={styles.test}
    aria-label="Body"
    minRows={3}
    placeholder="Содержание статьи, поддерживает BB-коды [b][/b][u][/u][i][/i] остальные не тестились"
    onChange={e => setBody(e.target.value)}/>
    </div>
    
    <div>Теги:
        <Checkbox onChange={handleNewsChange} style={{marginLeft: 60}}/><label>Новости</label>
        <Checkbox onChange={handleEventsChange}/><label>События</label>
        <Checkbox onChange={handleChangelogChange}/><label>Изменения</label>
    </div>
   

    <div>Пароль: <input onChange={e => setPassword(e.target.value)}></input></div>
    <Button variant="contained" style={{margin: 20}} onClick={handleAddArticleClick}>Загрузить статью</Button>
  </div>
  </Layout>
)}