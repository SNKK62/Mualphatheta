import React from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import Latex from 'react-latex-next';
import '../../assets/stylesheets/index.css';
import MediaQuery from 'react-responsive';


const Title = styled.div`
    width: 90%;
    text-align: center;
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 15px;
    font-weight: bold;
    padding: 0 10px;
    white-space: pre-wrap;
`
const Description = styled.div`
    margin: auto;
    width: 80%;
    text-align: center;
    margin-bottom: 15px;
`
const Table = styled.table`
    width: 77%;
    margin: 10px auto;    
`;
const Lasttable = styled(Table)`
    margin-bottom: 30px;
`
const Tr1 = styled.tr`
    background: rgb(230,235,235);
`;
const Tr2 = styled.tr`
    background: rgb(200,200,200);
`
const Th = styled.th`
    text-align: center;
`;
const Td = styled.td`
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
`;
const Subtitle = styled.div`
    margin: 5px auto;
    width: 80%;
    text-align: left;
    padding-left: 10px;
    border-bottom: 1px solid black;
`;
const Desctd = styled(Td)`
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: left;  
`
const Tolist = styled.ul`
    margin: 10px;
`
const Toitem = styled.li`
    color: blue;
    text-decoration: underline;
    margin: 5px 0px 10px 30px;
    cursor: pointer;
    text-align: left;
    width: 120px;
`

const Button_pc = styled.span`
    border-radius: 50%;
    position: fixed;
    width: 50px;
    height: 45px;
    bottom: 10px;
    right: 37vw;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    border: 1px solid black;
    z-index: 30;
    padding-top: 5px;
    background-color: white;
    cursor: pointer;
`
const Button_mb = styled.span`
    border-radius: 50%;
    position: fixed;
    width: 50px;
    height: 45px;
    bottom: 10px;
    right: 4vw;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    border: 1px solid black;
    z-index: 30;
    padding-top: 5px;
    background-color: white;
    cursor: pointer;
`



const TexInstruction: React.VFC = () => {
    const Scrollto = (e: string) => {
        const wrapper: HTMLElement | null = document.getElementById('wrap');
        const target: HTMLElement | null = document.getElementById(e);
        if (target && wrapper) {
            const rect = target.getBoundingClientRect().top;
            const offset = window.pageYOffset;
            const gap = 75;
            const target_place = rect + offset - gap;
            wrapper.scrollTo({
                top: target_place,
                behavior: 'smooth',
            });
        }
    }
    const Totop = () => {
        const wrapper: HTMLElement | null = document.getElementById('wrap');
        if (wrapper) {
            wrapper.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }
    return (<>
        <Wrapper id='wrap' className='box'>
            <MediaQuery query='(min-width:1025px)'>
                <Button_pc onClick={(e) => { e.preventDefault(); Totop() }}>↑</Button_pc>
            </MediaQuery>
            <MediaQuery query='(max-width:1024px)'>
                <Button_mb onClick={(e) => { e.preventDefault(); Totop() }}>↑</Button_mb>
            </MediaQuery>
            <Title>
                KaTexテキストの書き方
            </Title>
            <Description>
                よく使う数式や記号などのKaTex記法です
            </Description>
            <Subtitle>
                目次
            </Subtitle>
            <Tolist>
                <Toitem onClick={() => {Scrollto('greek1')}}>ギリシャ文字1</Toitem>
                <Toitem onClick={() => { Scrollto('greek2') }}>ギリシャ文字2</Toitem>
                <Toitem onClick={() => { Scrollto('single') }} >単記号</Toitem>
                <Toitem onClick={() => { Scrollto('equation') }}>数式・演算子</Toitem>
                <Toitem onClick={() => {Scrollto('style')}} >文字のスタイル</Toitem>
                <Toitem onClick={() => {Scrollto('macro')}} >マクロ</Toitem>
            </Tolist>
            <Subtitle id='greek1'>
                ギリシャ文字1
            </Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $A$
                        </Latex>
                    </Td>
                    <Td>
                        $A$
                    </Td>
                    <Td>
                        <Latex>
                            $\alpha$
                        </Latex>
                    </Td>
                    <Td>
                        $\alpha$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $B$
                        </Latex>
                    </Td>
                    <Td>
                        $B$
                    </Td>
                    <Td>
                        <Latex>
                            $\beta$
                        </Latex>
                    </Td>
                    <Td>
                        $\beta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Gamma$
                        </Latex>
                    </Td>
                    <Td>
                        $\Gamma$
                    </Td>
                    <Td>
                        <Latex>
                            $\gamma$
                        </Latex>
                    </Td>
                    <Td>
                        $\gamma$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Delta$
                        </Latex>
                    </Td>
                    <Td>
                        $\Delta$
                    </Td>
                    <Td>
                        <Latex>
                            $\delta$
                        </Latex>
                    </Td>
                    <Td>
                        $\delta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $E$
                        </Latex>
                    </Td>
                    <Td>
                        $E$
                    </Td>
                    <Td>
                        <Latex>
                            $\epsilon$
                        </Latex>
                    </Td>
                    <Td>
                        $\epsilon$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $Z$
                        </Latex>
                    </Td>
                    <Td>
                        $Z$
                    </Td>
                    <Td>
                        <Latex>
                            $\zeta$
                        </Latex>
                    </Td>
                    <Td>
                        $\zeta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $H$
                        </Latex>
                    </Td>
                    <Td>
                        $H$
                    </Td>
                    <Td>
                        <Latex>
                            $\eta$
                        </Latex>
                    </Td>
                    <Td>
                        $\eta$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Theta$
                        </Latex>
                    </Td>
                    <Td>
                        $\Theta$
                    </Td>
                    <Td>
                        <Latex>
                            $\theta$
                        </Latex>
                    </Td>
                    <Td>
                        $\theta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $I$
                        </Latex>
                    </Td>
                    <Td>
                        $I$
                    </Td>
                    <Td>
                        <Latex>
                            $\iota$
                        </Latex>
                    </Td>
                    <Td>
                        $\iota$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $K$
                        </Latex>
                    </Td>
                    <Td>
                        $K$
                    </Td>
                    <Td>
                        <Latex>
                            $\kappa$
                        </Latex>
                    </Td>
                    <Td>
                        $\kappa$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Lambda$
                        </Latex>
                    </Td>
                    <Td>
                        $\Lambda$
                    </Td>
                    <Td>
                        <Latex>
                            $\lambda$
                        </Latex>
                    </Td>
                    <Td>
                        $\lambda$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $M$
                        </Latex>
                    </Td>
                    <Td>
                        $M$
                    </Td>
                    <Td>
                        <Latex>
                            $\mu$
                        </Latex>
                    </Td>
                    <Td>
                        $\mu$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $N$
                        </Latex>
                    </Td>
                    <Td>
                        $N$
                    </Td>
                    <Td>
                        <Latex>
                            $\nu$
                        </Latex>
                    </Td>
                    <Td>
                        $\nu$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Xi$
                        </Latex>
                    </Td>
                    <Td>
                        $\Xi$
                    </Td>
                    <Td>
                        <Latex>
                            $\xi$
                        </Latex>
                    </Td>
                    <Td>
                        $\xi$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $O$
                        </Latex>
                    </Td>
                    <Td>
                        $O$
                    </Td>
                    <Td>
                        <Latex>
                            $o$
                        </Latex>
                    </Td>
                    <Td>
                        $o$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Pi$
                        </Latex>
                    </Td>
                    <Td>
                        $\Pi$
                    </Td>
                    <Td>
                        <Latex>
                            $\pi$
                        </Latex>
                    </Td>
                    <Td>
                        $\pi$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $P$
                        </Latex>
                    </Td>
                    <Td>
                        $P$
                    </Td>
                    <Td>
                        <Latex>
                            $\rho$
                        </Latex>
                    </Td>
                    <Td>
                        $\rho$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Sigma$
                        </Latex>
                    </Td>
                    <Td>
                        $\Sigma$
                    </Td>
                    <Td>
                        <Latex>
                            $\sigma$
                        </Latex>
                    </Td>
                    <Td>
                        $\sigma$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $T$
                        </Latex>
                    </Td>
                    <Td>
                        $T$
                    </Td>
                    <Td>
                        <Latex>
                            $\tau$
                        </Latex>
                    </Td>
                    <Td>
                        $\tau$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Upsilon$
                        </Latex>
                    </Td>
                    <Td>
                        $\Upsilon$
                    </Td>
                    <Td>
                        <Latex>
                            $\upsilon$
                        </Latex>
                    </Td>
                    <Td>
                        $\upsilon$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Phi$
                        </Latex>
                    </Td>
                    <Td>
                        $\Phi$
                    </Td>
                    <Td>
                        <Latex>
                            $\phi$
                        </Latex>
                    </Td>
                    <Td>
                        $\phi$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $X$
                        </Latex>
                    </Td>
                    <Td>
                        $X$
                    </Td>
                    <Td>
                        <Latex>
                            $\chi$
                        </Latex>
                    </Td>
                    <Td>
                        $\chi$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Psi$
                        </Latex>
                    </Td>
                    <Td>
                        $\Psi$
                    </Td>
                    <Td>
                        <Latex>
                            $\psi$
                        </Latex>
                    </Td>
                    <Td>
                        $\psi$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Omega$
                        </Latex>
                    </Td>
                    <Td>
                        $\Omega$
                    </Td>
                    <Td>
                        <Latex>
                            $\omega$
                        </Latex>
                    </Td>
                    <Td>
                        $\omega$
                    </Td>
                </Tr1>
            </Table>
            <Subtitle id='greek2'>
                ギリシャ文字２
            </Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\varepsilon$
                        </Latex>
                    </Td>
                    <Td>
                        $\varepsilon$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\vartheta$
                        </Latex>
                    </Td>
                    <Td>
                        $\vartheta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\varrho$
                        </Latex>
                    </Td>
                    <Td>
                        $\varrho$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\varsigma$
                        </Latex>
                    </Td>
                    <Td>
                        $\varsigma$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\varphi$
                        </Latex>
                    </Td>
                    <Td>
                        $\varphi$
                    </Td>
                </Tr2>
            </Table>
            <Subtitle id='single'>
                単記号
            </Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\nabla$
                        </Latex>
                    </Td>
                    <Td>
                        $\nabla$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\partial$
                        </Latex>
                    </Td>
                    <Td>
                        $\partial$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\times$
                        </Latex>
                    </Td>
                    <Td>
                        $\times$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\div$
                        </Latex>
                    </Td>
                    <Td>
                        $\div$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\pm$
                        </Latex>
                    </Td>
                    <Td>
                        $\pm$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\mp$
                        </Latex>
                    </Td>
                    <Td>
                        $\mp$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\neq$
                        </Latex>
                    </Td>
                    <Td>
                        $\neq$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\sim$
                        </Latex>
                    </Td>
                    <Td>
                        $\sim$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\simeq$
                        </Latex>
                    </Td>
                    <Td>
                        $\simeq$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\fallingdotseq$
                        </Latex>
                    </Td>
                    <Td>
                        $\fallingsdotseq$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\risingdotseq$
                        </Latex>
                    </Td>
                    <Td>
                        $\risingdotseq$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\equiv$
                        </Latex>
                    </Td>
                    <Td>
                        $\equiv$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\geqq$
                        </Latex>
                    </Td>
                    <Td>
                        $\geqq$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\leqq$
                        </Latex>
                    </Td>
                    <Td>
                        $\leqq$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\gg$
                        </Latex>
                    </Td>
                    <Td>
                        $\gg$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\ll$
                        </Latex>
                    </Td>
                    <Td>
                        $\ll$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\oplus$
                        </Latex>
                    </Td>
                    <Td>
                        $\oplus$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\ominus$
                        </Latex>
                    </Td>
                    <Td>
                        $\ominus$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\otimes$
                        </Latex>
                    </Td>
                    <Td>
                        $\otimes$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\oslash$
                        </Latex>
                    </Td>
                    <Td>
                        $\oslash$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\circ$
                        </Latex>
                    </Td>
                    <Td>
                        $\circ$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\cdot$ 
                        </Latex>
                    </Td>
                    <Td>
                        $\cdot$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\cdots$
                        </Latex>
                    </Td>
                    <Td>
                        $\cdots$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\bullet$
                        </Latex>
                    </Td>
                    <Td>
                        $\bullet$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\in$
                        </Latex>
                    </Td>
                    <Td>
                        $\in$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\ni$
                        </Latex>
                    </Td>
                    <Td>
                        $\ni$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\notin$
                        </Latex>
                    </Td>
                    <Td>
                        $\notin$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\subset$
                        </Latex>
                    </Td>
                    <Td>
                        $\subset$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\supset$
                        </Latex>
                    </Td>
                    <Td>
                        $\supset$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\subseteq$
                        </Latex>
                    </Td>
                    <Td>
                        $\subseteq$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\cap$
                        </Latex>
                    </Td>
                    <Td>
                        $\cap$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\cup$
                        </Latex>
                    </Td>
                    <Td>
                        $\cup$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\emptyset$
                        </Latex>
                    </Td>
                    <Td>
                        $\emptyset$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\infty$
                        </Latex>
                    </Td>
                    <Td>
                        $\infty$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Rightarrow$
                        </Latex>
                    </Td>
                    <Td>
                        $\Rightarrow$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Leftrightarrow$
                        </Latex>
                    </Td>
                    <Td>
                        $\Leftrightarrow$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\forall$
                        </Latex>
                    </Td>
                    <Td>
                        $\forall$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\exist$
                        </Latex>
                    </Td>
                    <Td>
                        $\exist$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $( \big( \Big( \bigg( \Bigg( \Bigg) \bigg) \Big) \big) )$
                        </Latex>
                    </Td>
                    <Td>
                        $( \big( \Big( \bigg( \Bigg( \Bigg) \bigg) \Big) \big) )$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\lang \, \rang$
                        </Latex>
                    </Td>
                    <Td>
                        $\lang \, \rang$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\{ \\, \\}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\{ \\, \\}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\angle$
                        </Latex>
                    </Td>
                    <Td>
                        $\angle$
                    </Td>
                </Tr1>
            </Table>
            <Subtitle id='equation'>数式・演算子</Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\frac{a}{b}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\frac{a}{b}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$e^x$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$e^x$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\sqrt{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\sqrt{x}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\sqrt[n]{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\sqrt[n]{x}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\log x$
                        </Latex>
                    </Td>
                    <Td>
                        $\log x$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\log_a x$
                        </Latex>
                    </Td>
                    <Td>
                        $\log_a x$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $|x|$
                        </Latex>
                    </Td>
                    <Td>
                        $|x|$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"${}_nC_r$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"${}_nC_r$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"${}_nP_r$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"${}_nP_r$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"${}_nH_r$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"${}_nH_r$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\displaystyle\\lim_{n\\to\\infty}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\displaystyle\\lim_{n\\to\\infty}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\sin x$
                        </Latex>
                    </Td>
                    <Td>
                        $\sin x$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\cos x$
                        </Latex>
                    </Td>
                    <Td>
                        $\cos x$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\tan x$
                        </Latex>
                    </Td>
                    <Td>
                        $\tan x$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\displaystyle\\sum_{i=1}^{n}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\displaystyle\\sum_{i=1}^{n}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\displaystyle\\prod_{i=1}^{n}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\displaystyle\\prod_{i=1}^{n}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\int_{a}^{b}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\int_{a}^{b}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\iint_{a}^{b}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\iint_{a}^{b}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $a_n$
                        </Latex>
                    </Td>
                    <Td>
                        $a_n$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\vec{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\vec{x}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\bm{a}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\bm{a}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\overbrace{2 \\times 2 \\times 2}^{\\text{2の3乗}}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\overbrace{2 \\times 2 \\times 2}^{\\text{2の3乗}}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$a \\\\ b$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$a \\\\ b$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\begin{cases} x + y &= 3 \\\\ 2x + y &= 8 \\end{cases}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\begin{cases} x + y &= 3 \\\\ 2x + y &= 8 \\end{cases}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\begin{aligned} x&=3+2 \\\\ &=5 \\end{aligned}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\begin{aligned} x&=3+2 \\\\ &=5 \\end{aligned}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Desctd>
                        <Latex>
                            {"$$\\tag{1} x + y = 3\\,\\,$$"}
                        </Latex>
                    </Desctd>
                    <Td>
                        {"$$\\tag{1} x + y = 3$$"}
                    </Td>
                </Tr1>
            </Table>
            <Subtitle id='style'>文字のスタイル</Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\hat{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\hat{x}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\mathbb{N}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\mathbb{N}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\mathcal{N}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\mathcal{N}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\mathrm{Re}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\mathrm{Re}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\overline{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\overline{x}$"}
                    </Td>
                </Tr2>
            </Table>
            <Subtitle id='macro'>マクロ</Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        使い方
                    </Th>
                </Tr1>
                <Tr2>
                    <Desctd>
                        {"$\n　　\\gdef\\関数名#1#2{表示} //定義(#数字は引数の数だけ)//\n　　\\関数名{引数１}{引数２} //実行//\n$"}
                    </Desctd>
                </Tr2>
            </Table>
            <Lasttable>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\gdef\\d#1#2{\\frac{d#1}{d#2}}\n\\d{y}{x}$"}
                        </Latex>
                    </Td>
                    <Desctd>
                        {"$\\gdef\\d#1#2{\\frac{d#1}{d#2}}\n　\n\\d{y}{x}$"}
                    </Desctd>
                </Tr2>
            </Lasttable>
            <Description>
                上記以外は各自調べてください
            </Description>
        </Wrapper>
  </>  )
}

export default TexInstruction
