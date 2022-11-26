import * as React from "react";
import * as Dataview from "obsidian-dataview";
import { useTable } from 'react-table'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { Link } from "@mui/material";
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Theme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { KeyboardArrowDown, KeyboardArrowUp, Palette, Create, Person, LegendToggleRounded } from '@mui/icons-material';

import {
	App,
    MarkdownPostProcessorContext,
    TFile,
    Plugin,
} from "obsidian";


const FileCell = ({value: {cell : {value: cellValue}}}) => {

    const {path} = cellValue
    const fileName = path?.split('/')?.at(-1)?.split('.')?.[0]


    return <Link rel="noopener" target="_blank" className="internal-link" data-href="Comics/Inspiration/db/row_1.md" href="Comics/Inspiration/db/row_1.md">{fileName}</Link>
}

const EmbedListCell = (props: {value: {cell: any, app: App, ctx: MarkdownPostProcessorContext}}) => {
    const {value : {cell : {value : cellValue}, app, ctx}} = props
    console.log('[hf] EmbedListCell', {cellValue})
    const embedList = cellValue
    const resourcePath = app.vault.adapter.getResourcePath("Comics/Inspiration/resources").split('?')[0]
    const relativeResourcesPath = "Comics/Inspiration/resources"

    return (
        <Box>
            <ImageList sx={{width: '200px'}} cols={1}>
            {
                Array.isArray(embedList) ? embedList.map(imgFile => {
                return (
                <ImageListItem key={imgFile}>
                    <Box>
                        <Link rel="noopener" target="_blank" className="internal-link" data-href={`${relativeResourcesPath}/${imgFile}`} href={`${relativeResourcesPath}/${imgFile}`}>
                            <img src={`${resourcePath}/${imgFile}`} loading="lazy"/>
                        </Link>
                    </Box>
                </ImageListItem>
                )
            }) : (<ImageListItem key={embedList}>
                    <Box>
                        <Link rel="noopener" target="_blank" className="internal-link" data-href={`${relativeResourcesPath}/${embedList}`} href={`${relativeResourcesPath}/${embedList}`}>
                            <img src={`${resourcePath}/${embedList}`} loading="lazy"/>
                        </Link>
                    </Box>
                </ImageListItem>)
            }
            {/* {embedList.map(imgFile => {
                return (
                <ImageListItem key={imgFile}>
                    <Box>
                        <Link rel="noopener" target="_blank" className="internal-link" data-href={`${relativeResourcesPath}/${imgFile}`} href={`${relativeResourcesPath}/${imgFile}`}>
                            <img src={`${resourcePath}/${imgFile}`} loading="lazy"/>
                        </Link>
                    </Box>
                </ImageListItem>
                )
            })} */}
            </ImageList>
        </Box>
    )
}

const MetadataCommentsCell = (props: {value: {cell: any, app: App, ctx: MarkdownPostProcessorContext}}) => {
    const {value : {cell : {value : cellValue}, app, ctx}} = props
  const [checked, setChecked] = React.useState(false);
  const formattedValue = JSON.stringify(cellValue)

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
    return (
        <Box borderRadius={"10px"} position="relative" margin="auto" padding="8px" justifyContent="center">
            <Box display="block" boxSizing="inherit">
                <Box sx={{
                    width: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                        <div>
                            <Collapse in={checked} collapsedSize={50} orientation="vertical">
                                    <Typography variant="body1" gutterBottom>
                                     {formattedValue}
                                 </Typography>
                            </Collapse>
                        </div>
                        <Button variant="text" onClick={handleChange}>
                            {checked ? <KeyboardArrowUp />: <KeyboardArrowDown />}
                        </Button>
                </Box>
            </Box>
        </Box>
    )
}
const CreditsCell = (props: {value: {cell: any, app: App, ctx: MarkdownPostProcessorContext}}) => {
    const {value : {cell : {value : cellValue}, app, ctx}} = props
  const [checked, setChecked] = React.useState(false);
  console.log('[hf] CreditsCell', {cellValue})
//   const parsedValue = JSON.parse(cellValue)

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const renderSwitch = (param:string) => {
  switch(param.toLowerCase()) {
    case 'writer':
      return <Create />;
    case 'artist':
        return <Palette />
    default:
      return <Person />;
  }
}


    if(cellValue.length <= 2) {
        return (<Box sx={{ width: '300px', bgcolor: 'background.paper' }}>
         <List sx={{paddingLeft: '0'}}>
            {cellValue.map(credit => 
                <ListItem sx={{padding: '0'}}>
                    <ListItemIcon sx={{minWidth: '30px'}}>
                        {renderSwitch(credit.role)}
                    </ListItemIcon>
                    <ListItemText primary={`${credit.role}: ${credit.person}`} />
                </ListItem>
            )}
         </List>
        </Box>)
    }
    return (
        <Box borderRadius={"10px"} position="relative" margin="auto" padding="8px" justifyContent="center" sx={{ width: '300px', bgcolor: 'background.paper' }} >
            <Box display="block" boxSizing="inherit">
                <Box sx={{
                    width: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                        <div>
                            <Collapse in={checked} collapsedSize={80} orientation="vertical">
                                    <List sx={{paddingLeft: '0'}}>
                                        {cellValue.map(credit => 
                                            <ListItem sx={{padding: '0'}}>
                                                <ListItemIcon sx={{minWidth: '30px'}}>
                                                    {renderSwitch(credit.role)}
                                                </ListItemIcon>
                                                <ListItemText primary={`${credit.role}: ${credit.person}`} />
                                            </ListItem>
                                        )}
                                    </List>
                            </Collapse>
                        </div>
                        <Button variant="text" onClick={handleChange}>
                            {checked ? <KeyboardArrowUp />: <KeyboardArrowDown />}
                        </Button>
                </Box>
            </Box>
        </Box>
    )
}

const accessors = ['file', 'inspires', 'whereToUse', 'embedList', 'descriptionAndComments', 'series', 'title', 'volume', 'issue', 'credits', 'metadataComments', 'createdAt']
const headers = ['File', 'Inspires', 'Where to Use', 'Images', 'Description and Comments', 'Series', 'Title', 'Volume', 'Issue', 'Credits', 'Metadata Comments', 'Created At']
const customRenderers = [(value) => <FileCell value={value}/>, undefined, undefined, (value) => <EmbedListCell value={value}/>, undefined, undefined, undefined, undefined, undefined, (value) => <CreditsCell value={value} />, (value) => <MetadataCommentsCell value={value} />]

export const ReactView = (props: {app: App, ctx: MarkdownPostProcessorContext, registerEvent: Plugin['registerEvent'], logger: (options: {timestamp?: boolean}, ...args: string[]) => void}) => {
    const {app, ctx, registerEvent, logger} = props
    const DataviewAPI = Dataview?.getAPI(app)
    const [value, setValue] = React?.useState({})
    const query = `Table ${accessors.slice(1).map((accessor, idx) => `${accessor} AS "${headers[idx + 1]}"`).join(', ')} FROM "Comics/Inspiration/db"`

    const headersForTable = React.useMemo(() => {
        return accessors.map((accessor, idx) => {

            const standardRenderFunc = ({ value }: {value: any}) => String(value)
            const renderFunc = customRenderers[idx] || standardRenderFunc
            return {
                Header: headers[idx],
                accessor,
                Cell: renderFunc,
            }
        })
    }, [headers, accessors])

    const valuesForTable = React.useMemo(() => {
        return value?.values?.map((row) => {
            return accessors.reduce((record, accessor, idx) => {
                record[accessor] = row[idx] || ''
                return record
            }, {})
        })
    }, [value, accessors])

    console.log('[hf]', {headersForTable, valuesForTable, values: value.values})
    logger({timestamp: true}, '### REACT VIEW')
    logger({}, 'values for table:', `${valuesForTable}`)

    
    const getQuery = React.useCallback(async () => {
        const res = await DataviewAPI?.query(query)
        // console.log('[hf]', {res})
        setValue(res?.value)
    }, [DataviewAPI, setValue])

    React.useEffect(() => {
        getQuery()
    }, [getQuery])

    
    React.useEffect(() => {
        console.log('[hf] register useEffect', {registerEvent})
        logger({}, '### register useEffect')

        registerEvent(app.vault.on('create', async (file) => {
            console.log('[hf] create event', {file})
            logger({}, '### createRegisterEvent cb')

            if(file.path.includes('Comics/Inspiration/db') && file instanceof TFile)  {
                logger({}, 'file path condition passes')
                try {
                    let tryCounter = 0
                    let fileMetadata
                    while (tryCounter <= 100 && !fileMetadata) {
                        fileMetadata = app.metadataCache.getFileCache(file)
                        if (fileMetadata) {
                            console.log(['hf', {fileMetadata}])
                            logger({}, 'Metadata found:', `${JSON.stringify(fileMetadata)}`)
                        } else {
                            tryCounter++;
                            console.log(`[hf] metadata find attempt: ${tryCounter}`)
                            logger({}, `[hf] metadata find attempt: ${tryCounter}`)
                             await new Promise(resolve => setTimeout(resolve, 1000));
                        }
                    }
                    // const {cached, skipped} = await DataviewAPI?.index.reload(file) || {}
                    // logger({}, 'dataview reload success', `${JSON.stringify({cached, skipped})}`)
                    // await DataviewAPI?.index.initialize()
                    // logger({}, 'dataview initialize success')
                    await DataviewAPI?.index.reinitialize()
                    logger({}, 'dataview reinitialize success')
                    const res = await DataviewAPI?.query(query)
                    logger({}, 'dataview query success', `${res?.value.values}`)
                    setValue(res?.value)
                } catch(e) {
                    logger({}, 'CREATE CALLBACK ERROR:', `${JSON.stringify(e)}`)
                }
            }
        }))

        registerEvent(app.vault.on('rename', async (file) => {
            console.log('[hf] rename event', {file})
            logger({}, '### renameRegisterEvent cb')
            if(file.path.includes('Comics/Inspiration/db'))  {
                logger({}, 'file path condition passes')
                await DataviewAPI?.index.reinitialize()
                const res = await DataviewAPI?.query(query)
                logger({}, 'rename data:', `${res?.value.values}`)
                setValue(res?.value)
            }
        }))
        registerEvent(app.vault.on('modify', async (file) => {
            console.log('[hf] modify event', {file})
            if(file.path.includes('Comics/Inspiration/db'))  {
                logger({}, 'file path condition passes')
                await DataviewAPI?.index.reinitialize()
                const res = await DataviewAPI?.query(query)
                logger({}, 'modify data:', `${res?.value.values}`)
                setValue(res?.value)
            }
        }))
        registerEvent(app.vault.on('delete', async (file) => {
            console.log('[hf] delete event', {file})
            logger({}, '### deleteRegisterEvent cb')
            if(file.path.includes('Comics/Inspiration/db'))  {
                logger({}, 'file path condition passes')
                await DataviewAPI?.index.reinitialize()
                const res = await DataviewAPI?.query(query)
                logger({}, 'delete data:', `${res?.value.values}`)
                setValue(res?.value)
            }
        }))
        registerEvent(app.vault.on(''))
    }, [DataviewAPI, registerEvent, app])

    // const markdownTable = DataviewAPI?.markdownTable(value?.headers, value?.values)
    const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns: headersForTable || [], data: valuesForTable || [] })
//    console.log('[hf]', {tableProps: getTableProps(),
//      tableBodyProps: getTableBodyProps(),
//      headerGroups,
//      rows,
//      prepareRow})
    // const handleClick = (e) => {
    //     setNum(num + 1)
    // }
  return (<div><h4>Comics Table</h4>
  <div>
    {/* <ReactMarkdown children={markdownTable || ''} remarkPlugins={[remarkGfm]}/> */}
    {/* Material UI Table */}
    {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <TableCell
                            {...column.getHeaderProps()}
                            style={{
                            borderBottom: 'solid 3px red',
                            background: 'aliceblue',
                            color: 'black',
                            fontWeight: 'bold',
                            }}
                        >
                            {column.render('Header')}
                        </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
        </Table>
    </TableContainer> */}
    {/* Raw JSX Table */}
    <div style={{borderRadius: '10%'}}>
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => {
            // console.log('[hf]', {headerGroupProps: headerGroup.getHeaderGroupProps()})
            return (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         )})}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
        //    console.log('[hf]', {rowProps: row.getRowProps()})
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                // console.log('[hf]', {cellProps: cell.getCellProps()})
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell', {app, ctx})}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     </div>
  </div>
</div>);
};