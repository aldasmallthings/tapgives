import React, {useState} from "react";
import {
    Box,
    Button, Container, Dialog, DialogActions, DialogContentText,
    FormControl, FormLabel,
    InputLabel,
    NativeSelect, Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@material-ui/core";
import LocalizationHelper from "../Helpers/LocalizationHelper";
import Grid from "@material-ui/core/Grid";
import {center} from "@turf/turf";
import {GridCell} from "@mui/x-data-grid";
import {connect} from "react-redux";
import {Storage} from "aws-amplify";
import {baseLanguages, basePhrases} from "../languageData";


class LanguageAdministration extends React.Component {
    constructor(props) {
        super(props);
        // Used to generate info and errors, makes them dynamic
        const languageRequirements = [
            {
                id: "id",
                display: this.props.strings.languageCode,
            },
            {
                id: "language",
                display: this.props.strings.languageName,
            },
        ]
        // Dynamic generation of new language variables
        const newLanguageInfo = languageRequirements.reduce((prev, currReq)=> {
            return Object.assign(prev, {[currReq.id]: ""})
        }, {})
        const newLanguageErrors = languageRequirements.reduce((prev, currReq)=> {
            return Object.assign(prev, {[currReq.id]: false})
        }, {})
        // Uses english phrases as the key for all of the phrases.  technically should just use first language
        const languagePhrases = LocalizationHelper.getLanguagePhrasesFast()
        const phraseCodes = Object.entries(languagePhrases["en"])
        this.state = {
            languageRequirements: languageRequirements,
            currentLanguage: "English", //Defaults english
            currentLanguageCode: "en",
            languageCode: LocalizationHelper.getLanguageCodesFast(), //Constructor must be synchronous so cannot use slow version
            languagePhrases: languagePhrases,
            phraseCodes: phraseCodes,
            translatedPhrases: JSON.parse(JSON.stringify(languagePhrases["en"])), // deep copy so changing english wont change the "english version" as you go
            newLanguageErrors: newLanguageErrors,
            newLanguageInfo: newLanguageInfo,
            deleteLanguageMenu: false,
            openNewLanguageMenu: false,
            defaultLanguageMenu: false,
        }
    }
    // Swapping current displayed language
    changeLanguage(input) {
        // called by select so you have an input
        const languageName = input.target.value
        const languageCode = this.state.languageCode.find((language)=>{
                return language.language === languageName
            }).id

        this.setState({
            currentLanguage: input.target.value,
            currentLanguageCode: languageCode,
            translatedPhrases: JSON.parse(JSON.stringify(this.state.languagePhrases[languageCode])) // deep copy
        })
    }
    createNewLanguage() {
        // Checking if all requirements are met (id/language name)
        let allPassed = true
        let errors = this.state.languageRequirements.reduce((prev, req)=> {
            // Checks if its not empty, and doesnt match any existing requirements (id/language name)
            const out = !/.+/.test(this.state.newLanguageInfo[req.id]) || this.state.languageCode.some((language)=>language[req.id] === this.state.newLanguageInfo[req.id])
            if (out)
                allPassed = false
            return Object.assign(prev, {
                [req.id] : out
            })
        },{})
        this.setState({
            newLanguageErrors: errors
        })
        if (allPassed) {
            // Empty the values for the new language
            const newLanguageInfo = this.state.languageRequirements.reduce((prev, currReq)=> {
                return Object.assign(prev, {[currReq.id]: ""})
            }, {})
            const newLanguageErrors = this.state.languageRequirements.reduce((prev, currReq)=> {
                return Object.assign(prev, {[currReq.id]: false})
            }, {})
            // Create empty phrase list for the language
            let phrases = {}
            for (const phrase in this.state.phraseCodes)
                phrases = Object.assign(phrases, {[this.state.phraseCodes[phrase][0]]: ""})
            // Adds phrase list to list
            this.state.languageCode.push({
                id: this.state.newLanguageInfo.id,
                language: this.state.newLanguageInfo.language,
            })
            this.setState({
                languagePhrases: Object.assign(this.state.languagePhrases, {[this.state.newLanguageInfo.id]:phrases}),
                openNewLanguageMenu: false,
                newLanguageInfo: newLanguageInfo,
                newLanguageErrors: newLanguageErrors,
            })
            this.changeLanguage({target:{value:this.state.newLanguageInfo.language}})
            // NOTE: this doesnt not actually sync to cloud, you must do that after
        }
    }
    // Triggered when calling the sync to backend.
    async updateLanguage() {
        // Existing language/phrases
        let languages = await LocalizationHelper.queryLanguages()
        let phrases = await LocalizationHelper.queryPhrases()
        // Since phrases are categorised by id, we can directly assign id to phrases, it'll auto replace any existing language with the same id
        phrases = Object.assign(phrases, {[this.state.currentLanguageCode]:this.state.translatedPhrases})
        // If a language has identical id, replace it with this one, else just add it into language bank (id:language relationship)
        if (languages.some((language) => language.id === this.state.currentLanguageCode)) {
            languages.find((language) => language.id === this.state.currentLanguageCode).language = this.state.currentLanguage
        } else {
            languages.push({id: this.state.currentLanguageCode, language: this.state.currentLanguage})
        }
        // Calls the S3 put operation, which requires Admin in Cognito
        await LocalizationHelper.updateLanguage(languages, phrases)

        sessionStorage.setItem("updated", "false")
        this.setState({
            languageCode: languages,
            languagePhrases: phrases,
        })
        this.setState({
            languagePhrases: Object.assign(this.state.languagePhrases, {
                [this.state.currentLanguageCode]: this.state.translatedPhrases
            })
        })
    }
    async deleteLanguage() {
        await LocalizationHelper.deleteLanguageCascade(this.state.currentLanguageCode)
        this.setState({
            deleteLanguageMenu: false
        })
    }
    async defaultLanguage() {
        // await LocalizationHelper.addMultipleLanguagePhrases(baseLanguages)
        await Storage.put("basePhrases.json", basePhrases)
        await Storage.put("baseLanguages.json", baseLanguages)
        this.setState({defaultLanguageMenu: false})
    }
    render() {
        return <div>
            <Grid container direction={"row"} alignItems={"center"} spacing = {2}>
                <Grid item>
                    <FormControl>
                        <NativeSelect
                            value={this.state.currentLanguage}
                            inputProps={{
                                name: "Language",
                                id: "selectLanguage"
                            }}
                            onChange={this.changeLanguage.bind(this)}
                        >{this.state.languageCode.map((val) => {return <option > {val.language} </option>})}
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormLabel>{this.props.strings.languageCode + ": " + this.state.currentLanguageCode}</FormLabel>
                </Grid>
                <Grid item>
                    <Button variant={"outlined"} onClick={()=>{this.setState({openNewLanguageMenu: true})}}>{this.props.strings.addNewLanguage}</Button>
                </Grid>
                <Grid item>
                    <Button variant={"outlined"} onClick={this.updateLanguage.bind(this)}>{this.props.strings.syncLanguageToCloud}</Button>
                </Grid>
                <Grid item>
                    <Button variant={"outlined"} onClick={()=>{this.setState({deleteLanguageMenu: true})}}>{this.props.strings.delete}</Button>
                </Grid>
                <Grid item>
                    <Button variant={"outlined"} onClick={()=>{this.setState({defaultLanguageMenu: true})}}>{this.props.strings.changeDefault}</Button>
                </Grid>
                {/*Menu to add any new languages*/}
                <Grid item>
                    <Dialog open={this.state.openNewLanguageMenu} onClose={()=>{this.setState({openNewLanguageMenu: false})}} maxWidth={"md"} >
                        <DialogActions>
                            <Grid container direction={"column"} justifyContent={"center"}>
                                <DialogContentText>
                                    {this.props.strings.addLanguageTemplate}
                                </DialogContentText>
                                {/*In the CIC version of this program, only two requirements, ID and language are used, stored in state*/}
                                <Grid container direction = "row" spacing = {1}>
                                    {this.state.languageRequirements.map((requirement)=> (
                                        <Grid item>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                /*each property is dynamically set, along with their errors*/
                                                label = {requirement.display}
                                                error = {this.state.newLanguageErrors[requirement.id]}
                                                defaultValue = {this.state.newLanguageInfo[requirement.id]}
                                                onChange={(input)=> {
                                                    const text = input.target.value
                                                    this.setState({
                                                        newLanguageInfo: Object.assign(this.state.newLanguageInfo, {
                                                            [requirement.id]:text
                                                        })
                                                    })
                                                }}/>
                                        </Grid>
                                    ))}
                                </Grid>
                                <DialogActions>
                                    <Button onClick={()=>{this.setState({openNewLanguageMenu: false})}}>Cancel</Button>
                                    <Button onClick={this.createNewLanguage.bind(this)}>Add</Button>
                                </DialogActions>
                            </Grid>

                        </DialogActions>
                    </Dialog>
                </Grid>
                {/*Site Deletion popup*/}
                <Grid item>
                    <Dialog open={this.state.deleteLanguageMenu} onClose={()=>{this.setState({deleteLanguageMenu: false})}} maxWidth={"md"} >
                        <DialogActions>
                            <Grid container direction={"column"} justifyContent={"center"}>
                                <DialogContentText>
                                    {this.props.strings.deleteLanguageTemplate}
                                </DialogContentText>
                                <DialogActions>
                                    <Button onClick={()=>{this.setState({deleteLanguageMenu: false})}}>{this.props.strings.cancel}</Button>
                                    <Button onClick={this.deleteLanguage.bind(this)}>{this.props.strings.delete}</Button>
                                </DialogActions>
                            </Grid>

                        </DialogActions>
                    </Dialog>
                </Grid>
                {/*Default localization popup*/}
                <Grid item>
                    <Dialog open={this.state.defaultLanguageMenu} onClose={()=>{this.setState({defaultLanguageMenu: false})}} maxWidth={"md"} >
                        <DialogActions>
                            <Grid container direction={"column"} justifyContent={"center"}>
                                <DialogContentText>
                                    {this.props.strings.changeDefaultMenu}
                                </DialogContentText>
                                <DialogActions>
                                    <Button onClick={()=>{this.setState({defaultLanguageMenu: false})}}>{this.props.strings.cancel}</Button>
                                    <Button onClick={this.defaultLanguage.bind(this)}>{this.props.strings.confirm}</Button>
                                </DialogActions>
                            </Grid>

                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
            <Paper>
                <Table>
                    {/*Title for the page, localized*/}
                    <TableHead>
                        <TableRow>
                            <TableCell >Phrase Code</TableCell>
                            <TableCell align={"center"}>{this.props.strings.english}</TableCell>
                            <TableCell align="right">{this.props.strings.translation}</TableCell>
                        </TableRow>
                    </TableHead>
                    {/*Each row contains a "phrase", mapping the whole */}
                    <TableBody>
                        {this.state.phraseCodes.map((phrase) =>
                            <TableRow key = {phrase[0]}>
                                <TableCell  width="20%">{phrase[0]}</TableCell>
                                <TableCell align={"center"} width="30%">{phrase[1]}</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        fullWidth

                                        value={JSON.stringify(this.state.translatedPhrases[phrase[0]]).substring(1, JSON.stringify(this.state.translatedPhrases[phrase[0]]).length-1)}
                                        onChange={(value) => {
                                            this.setState({
                                                translatedPhrases: Object.assign(this.state.translatedPhrases, {
                                                    [phrase[0]]: value.target.value
                                                })
                                            })
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>

        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        language: state.languageState.language,
        code: state.languageState.code,
        languageCode: state.languageState.languageCodes,
        strings: state.languageState.strings,
    };
};



export default connect(mapStateToProps)(LanguageAdministration);